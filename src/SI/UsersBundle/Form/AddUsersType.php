<?php

namespace SI\UsersBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use FOS\UserBundle\Form\Type\RegistrationFormType as BaseType;

class AddUsersType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);
        $builder
            ->add('firstname')
            ->add('lastname')
            ->add('telephone')
            ->add('username', null, array('label' => 'Nom d\'utilisateur'))
            ->add('email', 'email', array('label' => 'Adresse mail'))
            ->add('dept', 'choice', array(
                'choices' => array(
                    'ROLE_ADMIN' => 'Administrateur',
                    'ROLE_ACCOUNTING' => 'Comptabilite',
                    'ROLE_MARKETING' => 'COMMERCIAL'
                ),
                'required'    => true,
                'empty_value' => 'Choisir le role',
                'empty_data'  => null,
                'data_class' => null
            ))
            ->add('enabled')
            ->add('plainPassword', 'repeated', array(
                'type' => 'password',
                'attr'=>array('label'=>' '),
                'options' => array('translation_domain' => 'FOSUserBundle'),
                'first_options' => array('label' => 'Mot de passe', 'attr'=>array('class'=>'form-control', 'type' => 'password')),
                'second_options' => array('label' => 'Confirmez votre mot de passe', 'attr'=>array('class'=>'form-control')),
                'invalid_message' => 'Les mots de passe ne correspondent pas',
            ))
        ;
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'SI\UsersBundle\Entity\Users'
        ));
    }


}
