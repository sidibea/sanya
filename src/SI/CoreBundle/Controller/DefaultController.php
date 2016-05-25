<?php

namespace SI\CoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('SICoreBundle:Default:index.html.twig');
    }
}
