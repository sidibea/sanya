<?php

namespace SI\CoreBundle\Form;

use Doctrine\ORM\EntityRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class InvoicesReglementType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
            $builder

                ->add('reglement', 'collection', array(
                    'type'         => new ReglementType(),
                    'allow_add'    => false,
                    'allow_delete' => false
                ))
        ;
    }
    
    public function getParent(){
        return new InvoicesType();
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'si_core_invoice_reglement';
    }
}
