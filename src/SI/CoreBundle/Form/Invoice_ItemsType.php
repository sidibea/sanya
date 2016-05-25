<?php

namespace SI\CoreBundle\Form;

use Doctrine\ORM\EntityRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class Invoice_ItemsType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('products', 'entity', array(
                'class'    => 'SICoreBundle:Products',
                'query_builder' => function(EntityRepository $er) {
                    return $er->createQueryBuilder('c');
                },
                'property' => 'code',
                'multiple' => false,
                'label' => 'Produits',
                'attr' => array('class' => 'form-control', 'label' => 'Produits' )
            ))
            ->add('quantity', 'number', array(
                'label' => 'Qte',

                'attr' => array('class' => 'form-control col-xs-3')
            ))

            ->add('tauxRemise', 'text', array(
                'label' => 'Taux de remise',
                'attr' => array('class' => 'form-control')
            ))

            ->add('delivery', 'text', array(
                'label' => 'Prix de livraison',
                'attr' => array('class' => 'form-control')
            ))

        ;
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'SI\CoreBundle\Entity\Invoice_Items'
        ));
    }
}
