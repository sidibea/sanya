<?php

namespace SI\CoreBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Quotations
 *
 * @ORM\Table(name="quotations")
 * @ORM\Entity(repositoryClass="SI\CoreBundle\Repository\QuotationsRepository")
 */
class Quotations
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="SI\CoreBundle\Entity\Customers", cascade={"persist", "remove"})
     */
    private $customer;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_quotation", type="datetime")
     */
    private $dateQuotation;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_expiration", type="datetime")
     */
    private $dateExpiration;

    /**
     * @var string
     *
     * @ORM\Column(name="reference", type="string", length=255, nullable=true)
     */
    private $reference;

    /**
     * @var string
     *
     * @ORM\Column(name="payment_methods", type="string", length=255, nullable=true)
     */
    private $paymentMethods;

    /**
     * @ORM\ManyToMany(targetEntity="SI\CoreBundle\Entity\Quotation_items", cascade={"persist"})
     */
    private $quotationItems;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_add", type="datetime")
     */
    private $dateAdd;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_upd", type="datetime")
     */
    private $dateUpd;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set customer
     *
     * @param string $customer
     * @return Quotations
     */
    public function setCustomer($customer)
    {
        $this->customer = $customer;

        return $this;
    }

    /**
     * Get customer
     *
     * @return string 
     */
    public function getCustomer()
    {
        return $this->customer;
    }

    /**
     * Set dateQuotation
     *
     * @param \DateTime $dateQuotation
     * @return Quotations
     */
    public function setDateQuotation($dateQuotation)
    {
        $this->dateQuotation = $dateQuotation;

        return $this;
    }

    /**
     * Get dateQuotation
     *
     * @return \DateTime 
     */
    public function getDateQuotation()
    {
        return $this->dateQuotation;
    }

    /**
     * Set dateExpiration
     *
     * @param \DateTime $dateExpiration
     * @return Quotations
     */
    public function setDateExpiration($dateExpiration)
    {
        $this->dateExpiration = $dateExpiration;

        return $this;
    }

    /**
     * Get dateExpiration
     *
     * @return \DateTime 
     */
    public function getDateExpiration()
    {
        return $this->dateExpiration;
    }

    /**
     * Set reference
     *
     * @param string $reference
     * @return Quotations
     */
    public function setReference($reference)
    {
        $this->reference = $reference;

        return $this;
    }

    /**
     * Get reference
     *
     * @return string 
     */
    public function getReference()
    {
        return $this->reference;
    }

    /**
     * Set paymentMethods
     *
     * @param string $paymentMethods
     * @return Quotations
     */
    public function setPaymentMethods($paymentMethods)
    {
        $this->paymentMethods = $paymentMethods;

        return $this;
    }

    /**
     * Get paymentMethods
     *
     * @return string 
     */
    public function getPaymentMethods()
    {
        return $this->paymentMethods;
    }

    // Comme la propriété $quotationItems,  doit être un ArrayCollection,
    // On doit la définir dans un constructeur :
    public function __construct()
    {
        $this->quotationItems = new ArrayCollection();
    }
    public function setQuotationItems(Quotation_items $items = null)
    {
        $this->quotationItems = $items;
    }

    // Notez le singulier, on ajoute une seule catégorie à la fois
    public function addQuotationItems(Quotation_items $items)
    {
        // Ici, on utilise l'ArrayCollection vraiment comme un tableau
        $this->quotationItems[] = $items;

        return $this;
    }

    public function removeQuotationItems(Quotation_items $items)
    {
        // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
        $this->quotationItems->removeElement($items);
    }

    // Notez le pluriel, on récupère une liste de catégories ici !
    public function getQuotationItems()
    {
        return $this->quotationItems;
    }



    /**
     * Set dateAdd
     *
     * @param \DateTime $dateAdd
     * @return Quotations
     */
    public function setDateAdd($dateAdd)
    {
        $this->dateAdd = $dateAdd;

        return $this;
    }

    /**
     * Get dateAdd
     *
     * @return \DateTime 
     */
    public function getDateAdd()
    {
        return $this->dateAdd;
    }

    /**
     * Set dateUpd
     *
     * @param \DateTime $dateUpd
     * @return Quotations
     */
    public function setDateUpd($dateUpd)
    {
        $this->dateUpd = $dateUpd;

        return $this;
    }

    /**
     * Get dateUpd
     *
     * @return \DateTime 
     */
    public function getDateUpd()
    {
        return $this->dateUpd;
    }
}
