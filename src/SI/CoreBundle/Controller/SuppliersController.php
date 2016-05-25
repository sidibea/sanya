<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 15/5/16
 * Time: 6:21 AM
 */

namespace SI\CoreBundle\Controller;
use SI\CoreBundle\Entity\Suppliers;
use SI\CoreBundle\Form\SuppliersType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use FOS\UserBundle\Model\UserInterface;

class SuppliersController extends Controller  {

    /**
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function listAction(){

        $user = $this->getUser();
        if (!is_object($user) || !$user instanceof UserInterface) {
            throw new AccessDeniedException('Vous n\'etes pas autorisé à acceder cette section.');
        }

        $em = $this->getDoctrine()->getManager();
        $suppliers = $em->getRepository('SICoreBundle:Suppliers')->findAll();


        return $this->render('SICoreBundle:Suppliers:list.html.twig', array(
            'suppliers' => $suppliers
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
        $suppliers = new Suppliers();
        $form = $this->createForm(new SuppliersType(), $suppliers);

        if ($form->handleRequest($request)->isValid()) {
            $suppliers->setDateAdd(new \datetime);
            $suppliers->setDateUpd(new \datetime);
            $em->persist($suppliers);
            $em->flush();

            $request->getSession()->getFlashBag()->add('notice', 'Les informations ont  bien ete enregistrée.');

            return $this->redirect($this->generateUrl('si_core_suppliers'));
        }


        return $this->render('SICoreBundle:Suppliers:add.html.twig', array(
            'form' => $form->createView()
        ));

    }

}