<?php

namespace SI\CoreBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ReglementType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('montant')
            ->add('dateAdd', 'date', array(
                'label' => 'Date Devis',
                'widget' => 'single_text',
                'format' => 'dd/MM/yyyy',
                'input'  => 'datetime',
                'error_bubbling' => true
            ))
            ->add('tresorerie', 'choice', array(
                'choices' => array('Banque' => 'Banque', 'Caisse' => 'Caisse'),
                'expanded' => false
            ))
            ->add('isCheque')
            ->add('refCheque')
        ;
    }
    
    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'SI\CoreBundle\Entity\Reglement'
        ));
    }
}
