<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 14/5/16
 * Time: 10:44 PM
 */

namespace SI\CoreBundle\Controller;

use SI\CoreBundle\Entity\Customers;
use SI\CoreBundle\Form\CustomersType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use FOS\UserBundle\Model\UserInterface;

class CustomersController extends Controller {

    /**
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function listAction(){

        $user = $this->getUser();
        if (!is_object($user) || !$user instanceof UserInterface) {
            throw new AccessDeniedException('Vous n\'etes pas autorisé à acceder cette section.');
        }

        $em = $this->getDoctrine()->getManager();
        $customers = $em->getRepository('SICoreBundle:Customers')->findAll();


        return $this->render('SICoreBundle:Customers:list.html.twig', array(
            'customers' => $customers
        ));
    }

    /**
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function newAction(Request $request){

        $user = $this->getUser();
        if (!is_object($user) || !$user instanceof UserInterface) {
            throw new AccessDeniedException('Vous n\'etes pas autorisé à acceder cette section.');
        }

        $em = $this->getDoctrine()->getManager();
        $customers = new Customers();
        $form = $this->createForm(new CustomersType(), $customers);

        if ($form->handleRequest($request)->isValid()) {
            $customers->setDateAdd(new \datetime);
            $customers->setDateUpd(new \datetime);
            $em->persist($customers);
            $em->flush();

            $request->getSession()->getFlashBag()->add('notice', 'Les informations ont  bien ete enregistrée.');

            return $this->redirect($this->generateUrl('si_core_customers'));
        }


        return $this->render('SICoreBundle:Customers:add.html.twig', array(
            'form' => $form->createView()
        ));

    }


    /**
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function editAction(Request $request, $id){

        $user = $this->getUser();
        if (!is_object($user) || !$user instanceof UserInterface) {
            throw new AccessDeniedException('Vous n\'etes pas autorisé à acceder cette section.');
        }

        $em = $this->getDoctrine()->getManager();
        $customers = $em->getRepository('SICoreBundle:Customers')->find($id);
        $form = $this->createForm(new CustomersType(), $customers);

        if ($form->handleRequest($request)->isValid()) {
            $customers->setDateUpd(new \datetime);
            $em->persist($customers);
            $em->flush();

            $request->getSession()->getFlashBag()->add('notice', 'Les informations ont  bien ete enregistrée.');

            return $this->redirect($this->generateUrl('si_core_customers'));
        }


        return $this->render('SICoreBundle:Customers:add.html.twig', array(
            'form' => $form->createView()
        ));

    }

}