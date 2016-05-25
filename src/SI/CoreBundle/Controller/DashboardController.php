<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 7/5/16
 * Time: 7:57 PM
 */

namespace SI\CoreBundle\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use FOS\UserBundle\Model\UserInterface;

class DashboardController extends Controller {

    public function indexAction(){
        $user = $this->getUser();
        if (!is_object($user) || !$user instanceof UserInterface) {
            throw new AccessDeniedException('Vous n\'etes pas autorisé à acceder cette section.');
        }

        $em = $this->getDoctrine()->getManager();

        $invoices = $em->getRepository('SICoreBundle:Invoices')->findAll();


        return $this->render('SICoreBundle::index.html.twig', array(
            'invoices' => $invoices
        ));
    }

}