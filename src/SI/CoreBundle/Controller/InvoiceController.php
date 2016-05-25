<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 24/5/16
 * Time: 7:23 PM
 */

namespace SI\CoreBundle\Controller;


use SI\CoreBundle\Entity\Invoices;
use SI\CoreBundle\Entity\Reglement;
use SI\CoreBundle\Form\InvoicesType;
use SI\CoreBundle\Form\ReglementType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use FOS\UserBundle\Model\UserInterface;

class InvoiceController extends Controller{

    /**
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function listAction(){

        $user = $this->getUser();
        if (!is_object($user) || !$user instanceof UserInterface) {
            throw new AccessDeniedException('Vous n\'etes pas autorisé à acceder cette section.');
        }

        $em = $this->getDoctrine()->getManager();
        $invoices = $em->getRepository('SICoreBundle:Invoices')->findAll();


        return $this->render('SICoreBundle:Invoices:list.html.twig', array(
            'invoices' => $invoices
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
        $invoices = new Invoices();
        $form = $this->createForm(new InvoicesType(), $invoices);

        if ($form->handleRequest($request)->isValid()) {
            $invoices->setDateAdd(new \datetime);
            $invoices->setDateUpd(new \datetime);
            $em->persist($invoices);
            $em->flush();

            $request->getSession()->getFlashBag()->add('notice', 'Les informations ont  bien ete enregistrée.');

            return $this->redirect($this->generateUrl('si_core_quotation'));
        }


        return $this->render('SICoreBundle:Invoices:add.html.twig', array(
            'form' => $form->createView()
        ));

    }

    /**
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function printAction($id){

        $user = $this->getUser();
        if (!is_object($user) || !$user instanceof UserInterface) {
            throw new AccessDeniedException('Vous n\'etes pas autorisé à acceder cette section.');
        }

        $em = $this->getDoctrine()->getManager();
        $invoices = $em->getRepository('SICoreBundle:Invoices')->find($id);


        return $this->render('SICoreBundle:Invoices:print.html.twig', array(
            'invoices' => $invoices
        ));
    }

    /**
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function paymentAction($id, Request $request){

        $user = $this->getUser();
        if (!is_object($user) || !$user instanceof UserInterface) {
            throw new AccessDeniedException('Vous n\'etes pas autorisé à acceder cette section.');
        }

        $em = $this->getDoctrine()->getManager();
        $invoices = $em->getRepository('SICoreBundle:Invoices')->find($id);

        $payment = new Reglement();
        $form = $this->createForm(new ReglementType(), $payment);

        if ($form->handleRequest($request)->isValid()) {
            $payment->setDateAdd(new \datetime);
            $payment->setInvoices($invoices);

            $em->persist($payment);
            $em->flush();

            $request->getSession()->getFlashBag()->add('notice', 'Les informations ont  bien ete enregistrée.');

            return $this->redirect($this->generateUrl('si_core_quotation'));
        }


        return $this->render('SICoreBundle:Invoices:payments.html.twig', array(
            'invoices' => $invoices,
            'form' => $form->createView()
        ));
    }

}