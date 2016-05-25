<?php

namespace SI\UsersBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class SIUsersBundle extends Bundle
{

    public function getParent(){
        return "FOSUserBundle";
    }
}
