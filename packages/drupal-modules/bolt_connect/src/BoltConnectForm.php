<?php

/**
 * @file
 * Contains Drupal\twig_namespaces\TwigNamespacesForm.
 */
namespace Drupal\bolt_connect;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\Filesystem\Filesystem;
use Webmozart\PathUtil\Path;

class BoltConnectForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames()
  {
    return [
      'bolt_connect.settings',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId()
  {
    return 'bolt_connect_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state)
  {
    /** @var \Twig_Environment $twig */
    $twig = \Drupal::service('twig');

    $config = $this->config('bolt_connect.settings');

    $form['twig_namespaces_file_path'] = array(
      '#type' => 'textfield',
      '#title' => 'Path to Twig Namespace definition file',
      '#default_value' => $config->get('twig_namespaces_file_path'),
      '#description' => 'This is a relative path from the Drupal web root to file named <code>twig-namespaces.bolt.json</code> created by the Bolt Build Tools.',
      '#size' => 60,
      '#maxlength' => 256,
      '#required' => true,
    );

    $form['boltrc_file_path'] = array(
      '#type' => 'textfield',
      '#title' => 'Path to Bolt Config file',
      '#default_value' => $config->get('boltrc_file_path'),
      '#description' => 'This is a relative path from the Drupal web root to file named <code>.boltrc.js</code>.',
      '#size' => 60,
      '#maxlength' => 256,
      '#required' => true,
    );

    // $form['enable_data_validation'] = [
    //   '#type' => 'radios',
    //   '#title' => 'Enable Data Validation',
    //   '#description' => t('Enables Component Data Validation. Is always off if Twig Debug is off.'),
    //   '#default_value' => 1,
    //   '#options' => [
    //     1 => 'On',
    //     0 => 'Off',
    //   ],
    // ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    if ($form_state->isValueEmpty('twig_namespaces_file_path') || $form_state->isValueEmpty('boltrc_file_path')) {
      // @todo Consider throwing error... but only if the fact that both are required forms doesn't do it
      // $form_state->setError();
    }

    $fs = new Filesystem();

    $filePath = $form_state->getValue('twig_namespaces_file_path');
    $fullFilePath = Path::join(DRUPAL_ROOT, $filePath);
    if (!$fs->exists($fullFilePath)) {
      $form_state->setErrorByName('twig_namespaces_file_path', t('File does not exist when looking for it at: ' . $fullFilePath));
    }

    $filePath = $form_state->getValue('boltrc_file_path');
    $fullFilePath = Path::join(DRUPAL_ROOT, $filePath);
    if (!$fs->exists($fullFilePath)) {
      $form_state->setErrorByName('boltrc_file_path', t('File does not exist when looking for it at: ' . $fullFilePath));
    }

  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state)
  {
    parent::submitForm($form, $form_state);

    $this->config('bolt_connect.settings')
      ->set('twig_namespaces_file_path', $form_state->getValue('twig_namespaces_file_path'))
      ->set('boltrc_file_path', $form_state->getValue('boltrc_file_path'))
      // ->set('enable_data_validation', $form_state->getValue('enable_data_validation'))
      ->save();
  }

}
