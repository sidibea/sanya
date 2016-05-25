<?php

namespace SI\UsersBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('SIUsersBundle:Default:index.html.twig');
    }
}
