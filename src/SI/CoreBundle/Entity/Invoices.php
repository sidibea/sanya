<?php

namespace SI\CoreBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Invoices
 *
 * @ORM\Table(name="invoices")
 * @ORM\Entity(repositoryClass="SI\CoreBundle\Repository\InvoicesRepository")
 */
class Invoices
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
     * @ORM\Column(name="date_invoice", type="datetime")
     */
    private $dateInvoice;



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
     * @ORM\ManyToMany(targetEntity="SI\CoreBundle\Entity\Invoice_Items", cascade={"persist"})
     */
    private $invoiceItems;

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
     * @ORM\ManyToMany(targetEntity="SI\CoreBundle\Entity\Reglement", cascade={"persist"})
     */
    private $reglement;


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
        $this->invoiceItems = new ArrayCollection();
        $this->reglement = new ArrayCollection();
    }
    public function setInvoiceItems(Invoice_Items $items = null)
    {
        $this->invoiceItems = $items;
    }

    // Notez le singulier, on ajoute une seule catégorie à la fois
    public function addInvoiceItems(Invoice_Items $items)
    {
        // Ici, on utilise l'ArrayCollection vraiment comme un tableau
        $this->invoiceItems[] = $items;

        return $this;
    }

    public function removeInvoiceItems(Invoice_Items $items)
    {
        // Ici on utilise une méthode de l'ArrayCollection, pour supprimer la catégorie en argument
        $this->invoiceItems->removeElement($items);
    }

    // Notez le pluriel, on récupère une liste de catégories ici !
    public function getInvoiceItems()
    {
        return $this->invoiceItems;
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

    /**
     * @return \DateTime
     */
    public function getDateInvoice()
    {
        return $this->dateInvoice;
    }

    /**
     * @param \DateTime $dateInvoice
     */
    public function setDateInvoice($dateInvoice)
    {
        $this->dateInvoice = $dateInvoice;
    }







}
