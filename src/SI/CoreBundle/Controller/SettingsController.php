<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 8/5/16
 * Time: 5:20 PM
 */

namespace SI\CoreBundle\Controller;


use FOS\UserBundle\Model\UserInterface;
use SI\CoreBundle\Form\CompanyType;
use SI\UsersBundle\Entity\Users;
use SI\UsersBundle\Form\AddUsersType;
use SI\UsersBundle\Form\UsersType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

class SettingsController extends Controller {

    /**
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function indexAction(){

        return $this->render('SICoreBundle:Settings:index.html.twig');

    }
    /**
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function userAction(Request $request){
        $user = $this->getUser();
        if (!is_object($user) || !$user instanceof UserInterface) {
            throw new AccessDeniedException('Vous n\'etes pas autorisé à acceder cette section.');
        }

        $em = $this->getDoctrine()->getManager();
        $form = $this->get('form.factory')->create(new UsersType(), $user);

        if ($form->handleRequest($request)->isValid()) {

            $em->persist($user);
            $em->flush();

            $request->getSession()->getFlashBag()->add('notice', 'Le bus a  bien ete enregistrée.');

            return $this->redirect($this->generateUrl('si_core_setting'));
        }

        return $this->render('SICoreBundle:Settings:user.html.twig', array(
            'form' => $form->createView()
        ));

    }

    /**
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function businessAction(Request $request){
        $user = $this->getUser();
        if (!is_object($user) || !$user instanceof UserInterface) {
            throw new AccessDeniedException('Vous n\'etes pas autorisé à acceder cette section.');
        }

        $em = $this->getDoctrine()->getManager();
        $company = $em->getRepository('SICoreBundle:Company')->find(1);
        $form = $this->get('form.factory')->create(new CompanyType(), $company);

        if ($form->handleRequest($request)->isValid()) {

            $em->flush();

            $request->getSession()->getFlashBag()->add('notice', 'Les informations ont  bien ete enregistrée.');

            return $this->redirect($this->generateUrl('si_core_setting_business'));
        }

        return $this->render('SICoreBundle:Settings:business.html.twig', array(
            'form' => $form->createView()
        ));

    }

    /**
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function userManagementsAction(){

        $user = $this->getUser();
        if (!is_object($user) || !$user instanceof UserInterface) {
            throw new AccessDeniedException('Vous n\'etes pas autorisé à acceder cette section.');
        }

        $em = $this->getDoctrine()->getManager();
        $users = $em->getRepository('SIUsersBundle:Users')->findAll();


        return $this->render('SICoreBundle:Settings:user_managements.html.twig', array(
            'users' => $users
        ));

    }

    /**
     * @Security("has_role('ROLE_ADMIN')")
     */
    public function newUsersAction(Request $request){

        $user = $this->getUser();
        if (!is_object($user) || !$user instanceof UserInterface) {
            throw new AccessDeniedException('Vous n\'etes pas autorisé à acceder cette section.');
        }

        $em = $this->getDoctrine()->getManager();
        $users = new Users();
        $form = $this->createForm(new AddUsersType(), $users);

        if ($form->handleRequest($request)->isValid()) {

            $role = $form->get('dept')->getData();
            if($role == 'ROLE_ADMIN')
                $users->addRole('ROLE_ADMIN');
            elseif($role == 'ROLE_MARKETING')
                $users->addRole('ROLE_MARKETING');
            elseif($role == 'ROLE_ACCOUNTING')
                $users->addRole('ROLE_ACCOUNTING');

            $em->persist($users);
            $em->flush();

            $request->getSession()->getFlashBag()->add('notice', 'Les informations ont  bien ete enregistrée.');

            return $this->redirect($this->generateUrl('si_core_setting_user_managements'));
        }


        return $this->render('SICoreBundle:Settings:newusers.html.twig', array(
            'form' => $form->createView()
        ));

    }



}