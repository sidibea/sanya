<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 18/5/16
 * Time: 12:00 AM
 */

namespace SI\CoreBundle\Controller;


use SI\CoreBundle\Entity\Quotations;
use SI\CoreBundle\Form\QuotationsType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use FOS\UserBundle\Model\UserInterface;

class QuotationsController extends Controller {

    /**
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function listAction(){

        $user = $this->getUser();
        if (!is_object($user) || !$user instanceof UserInterface) {
            throw new AccessDeniedException('Vous n\'etes pas autorisé à acceder cette section.');
        }

        $em = $this->getDoctrine()->getManager();
        $quotations = $em->getRepository('SICoreBundle:Quotations')->findAll();


        return $this->render('SICoreBundle:Quotations:list.html.twig', array(
            'quotations' => $quotations
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
        $quotations = new Quotations();
        $form = $this->createForm(new QuotationsType(), $quotations);

        if ($form->handleRequest($request)->isValid()) {
            $quotations->setDateAdd(new \datetime);
            $quotations->setDateUpd(new \datetime);
            $em->persist($quotations);
            $em->flush();

            $request->getSession()->getFlashBag()->add('notice', 'Les informations ont  bien ete enregistrée.');

            return $this->redirect($this->generateUrl('si_core_quotation'));
        }


        return $this->render('SICoreBundle:Quotations:add.html.twig', array(
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
        $quotations = $em->getRepository('SICoreBundle:Quotations')->find($id);


        return $this->render('SICoreBundle:Quotations:print.html.twig', array(
            'quotations' => $quotations
        ));
    }

}