<?php
namespace Grav\Plugin\Console;

use Grav\Console\ConsoleCommand;
use Grav\Common\Grav;
use Grav\Common\File\CompiledYamlFile;
use Grav\Common\User\User;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Helper\Helper;
use Symfony\Component\Console\Question\Question;

/**
 * Class CleanCommand
 *
 * @package Grav\Console\Cli
 */
class ChangePasswordCommand extends ConsoleCommand
{

    /**
     * @var array
     */
    protected $options = [];

    /**
     * Configure the command
     */
    protected function configure()
    {
        $this
            ->setName('change-password')
            ->setAliases(['edit-password', 'newpass', 'changepass', 'passwd'])
            ->addOption(
                'user',
                'u',
                InputOption::VALUE_REQUIRED,
                'The username'
            )
            ->addOption(
                'password',
                'p',
                InputOption::VALUE_REQUIRED,
                "The password. Note that this option is not recommended because the password will be visible by users listing the processes. You should also make sure the password respects Grav's password policy."
            )
            ->setDescription('Changes a User Password')
            ->setHelp('The <info>change-password</info> changes the password of the specified user. (User must exist)')
        ;
    }

    /**
     * @return int|null|void
     */
    protected function serve()
    {
        $this->options = [
            'user'        => $this->input->getOption('user'),
            'password1'   => $this->input->getOption('password')
        ];

        $this->validateOptions();

        $helper = $this->getHelper('question');
        $data   = [];

        $this->output->writeln('<green>Changing User Password</green>');
        $this->output->writeln('');

        if (!$this->options['user']) {
            // Get username and validate
            $question = new Question('Enter a <yellow>username</yellow>: ');
            $question->setValidator(function ($value) {
                return $this->validate('user', $value);
            });

            $username = $helper->ask($this->input, $this->output, $question);
        } else {
            $username = $this->options['user'];
        }


        if (!$this->options['password1']) {
            // Get password and validate
            $password = $this->askForPassword($helper, 'Enter a <yellow>new password</yellow>: ', function ($password1) use ($helper) {
                $this->validate('password1', $password1);

                // Since input is hidden when prompting for passwords, the user is asked to repeat the password
                return $this->askForPassword($helper, 'Repeat the <yellow>password</yellow>: ', function ($password2) use ($password1) {
                    return $this->validate('password2', $password2, $password1);
                });
            });

            $data['password'] = $password;
        } else {
            $data['password'] = $this->options['password1'];
        }

        // Lowercase the username for the filename
        $username = strtolower($username);
        
        // Grab the account file and read in the information before setting the file (prevent setting erase)
        $oldUserFile = CompiledYamlFile::instance(self::getGrav()['locator']->findResource('account://' . $username . YAML_EXT, true, true));
        $oldData = $oldUserFile->content();
        
        //Set the password feild to new password
        $oldData['password'] = $data['password'];
        
        // Create user object and save it using oldData (with updated password)
        $user = new User($oldData);
        $file = CompiledYamlFile::instance(self::getGrav()['locator']->findResource('account://' . $username . YAML_EXT, true, true));
        $user->file($file);
        $user->save();

        $this->output->writeln('');
        $this->output->writeln('<green>Success!</green> User <cyan>' . $username . '\'s</cyan> password changed.');
    }

    /**
     *
     */
    protected function validateOptions()
    {
        foreach (array_filter($this->options) as $type => $value) {
            $this->validate($type, $value);
        }
    }

    /**
     * @param        $type
     * @param        $value
     * @param string $extra
     *
     * @return mixed
     */
    protected function validate($type, $value, $extra = '')
    {
        $username_regex = '/' . Grav::instance()['config']->get('system.username_regex') . '/';
        $pwd_regex      = '/' . Grav::instance()['config']->get('system.pwd_regex') . '/';

        switch ($type) {
            case 'user':
                if (!preg_match($username_regex, $value)) {
                    throw new \RuntimeException('Username should be between 3 and 16 characters, including lowercase letters, numbers, underscores, and hyphens. Uppercase letters, spaces, and special characters are not allowed');
                }
                if (!file_exists(self::getGrav()['locator']->findResource('account://' . $value . YAML_EXT))) {
                    throw new \RuntimeException('Username "' . $value . '" does not exist, please pick another username');
                }

                break;

            case 'password1':
                if (!preg_match($pwd_regex, $value)) {
                    throw new \RuntimeException('Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters');
                }

                break;

            case 'password2':
                if (strcmp($value, $extra)) {
                    throw new \RuntimeException('Passwords did not match.');
                }

                break;
        }

        return $value;
    }

    /**
     * Get password and validate.
     *
     * @param Helper   $helper
     * @param string   $question
     * @param callable $validator
     *
     * @return string
     */
    protected function askForPassword(Helper $helper, $question, callable $validator)
    {
        $question = new Question($question);
        $question->setValidator($validator);
        $question->setHidden(true);
        $question->setHiddenFallback(true);
        return $helper->ask($this->input, $this->output, $question);
    }
}
