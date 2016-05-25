<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 24/5/16
 * Time: 2:23 PM
 */

namespace SI\CoreBundle\Controller;


use SI\CoreBundle\Entity\Stocks;
use SI\CoreBundle\Form\StocksType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use FOS\UserBundle\Model\UserInterface;

class StocksController extends Controller {

    /**
     * @Security("has_role('ROLE_ADMIN', 'ROLE_ACCOUNTING')")
     */
    public function listAction(){
        $user = $this->getUser();
        if (!is_object($user) || !$user instanceof UserInterface) {
            throw new AccessDeniedException('Vous n\'etes pas autorisé à acceder cette section.');
        }

        $em = $this->getDoctrine()->getManager();
        $stocks = $em->getRepository('SICoreBundle:Stocks')->getStocks();


        return $this->render('SICoreBundle:Stocks:list.html.twig', array(
            'stocks' => $stocks
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
        $stocks = new Stocks();
        $form = $this->createForm(new StocksType(), $stocks);

        if ($form->handleRequest($request)->isValid()) {
            $stocks->setDateAdd(new \datetime);
            $em->persist($stocks);
            $em->flush();

            $request->getSession()->getFlashBag()->add('notice', 'Les informations ont  bien ete enregistrée.');

            return $this->redirect($this->generateUrl('si_core_stockin'));
        }


        return $this->render('SICoreBundle:Stocks:add.html.twig', array(
            'form' => $form->createView()
        ));

    }

}