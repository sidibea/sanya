<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 13/5/16
 * Time: 2:23 PM
 */

namespace SI\CoreBundle\Controller;


use SI\CoreBundle\Entity\Products;
use SI\CoreBundle\Form\ProductsType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use FOS\UserBundle\Model\UserInterface;


class ProductsController extends Controller {

    /**
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function listAction(){

        $user = $this->getUser();
        if (!is_object($user) || !$user instanceof UserInterface) {
            throw new AccessDeniedException('Vous n\'etes pas autorisé à acceder cette section.');
        }

        $em = $this->getDoctrine()->getManager();
        $products = $em->getRepository('SICoreBundle:Products')->findAll();


        return $this->render('SICoreBundle:Products:list.html.twig', array(
            'products' => $products
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
        $products = new Products();
        $form = $this->createForm(new ProductsType(), $products);

        if ($form->handleRequest($request)->isValid()) {
            $products->setDateAdd(new \datetime);
            $products->setDateUpd(new \datetime);
            $em->persist($products);
            $em->flush();

            $request->getSession()->getFlashBag()->add('notice', 'Les informations ont  bien ete enregistrée.');

            return $this->redirect($this->generateUrl('si_core_product'));
        }


        return $this->render('SICoreBundle:Products:add.html.twig', array(
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
        $products = $em->getRepository('SICoreBundle:Products')->find($id);
        $form = $this->createForm(new ProductsType(), $products);

        if ($form->handleRequest($request)->isValid()) {
            $products->setDateUpd(new \datetime);
            $em->persist($products);
            $em->flush();

            $request->getSession()->getFlashBag()->add('notice', 'Les informations ont  bien ete enregistrée.');

            return $this->redirect($this->generateUrl('si_core_product'));
        }


        return $this->render('SICoreBundle:Products:add.html.twig', array(
            'form' => $form->createView()
        ));

    }

}