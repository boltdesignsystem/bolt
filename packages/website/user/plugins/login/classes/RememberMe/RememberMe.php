<?php

namespace Grav\Plugin\Login\RememberMe;

use Birke\Rememberme\Authenticator;

/**
 * RememberMe
 *
 * Handles persistent cookie-storage (Remember Me)
 *
 * @author  Sommerregen <sommerregen@benjamin-regler.de>
 */
class RememberMe extends Authenticator
{
    /**
     * Gets storage interface
     *
     * @return Storage\StorageInterface
     */
    public function getStorage()
    {
        return $this->storage;
    }

    /**
     * Set storage interface
     *
     * @param Storage\StorageInterface $storage Storage interface
     */
    public function setStorage($storage)
    {
        $this->storage = $storage;
    }
}
