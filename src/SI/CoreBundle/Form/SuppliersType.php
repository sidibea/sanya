<?php

namespace SI\CoreBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SuppliersType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name')
            ->add('societe')
            ->add('telephone')
            ->add('mobile')
            ->add('email')
            ->add('nTva')
            ->add('adresePrincipale', 'textarea')
            ->add('noteInterne')
            ->add('ville')
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'SI\CoreBundle\Entity\Suppliers'
        ));
    }
}
