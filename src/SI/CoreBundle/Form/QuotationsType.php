<?php

namespace SI\CoreBundle\Form;

use Doctrine\ORM\EntityRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class QuotationsType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('dateQuotation', 'date', array(
                'label' => 'Date Devis',
                'widget' => 'single_text',
                'format' => 'dd/MM/yyyy',
                'input'  => 'datetime',
                'error_bubbling' => true
            ))
            ->add('dateExpiration', 'date', array(
                'label' => 'Date d\'expiration',
                'widget' => 'single_text',
                'format' => 'dd/MM/yyyy',
                'input'  => 'datetime',
                'error_bubbling' => true
            ))
            ->add('reference')
            ->add('paymentMethods', 'choice', array(
                'choices' => array('Virement' => 'Virement', 'Chèque' => 'Chèque', 'Carte bancaire' => 'Carte bancaire', 'Traite' => 'Traite', 'Espèces' => 'Espèces', 'Autre' => 'Autre'),
                'expanded' => false
            ))

            ->add('customer', 'entity', array(
                'class'    => 'SICoreBundle:Customers',
                'query_builder' => function(EntityRepository $er) {
                    return $er->createQueryBuilder('c');
                },
                'property' => 'fullName',
                'multiple' => false,
            ))
            ->add('quotationItems', 'collection', array(
                'type'         => new Quotation_itemsType(),
                'allow_add'    => true,
                'allow_delete' => true
            ))
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'SI\CoreBundle\Entity\Quotations'
        ));
    }
}
