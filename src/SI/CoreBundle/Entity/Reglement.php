<?php

namespace SI\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Reglement
 *
 * @ORM\Table(name="reglement")
 * @ORM\Entity(repositoryClass="SI\CoreBundle\Repository\ReglementRepository")
 */
class Reglement
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
     * @var string
     *
     * @ORM\Column(name="montant", type="decimal", precision=10, scale=2)
     */
    private $montant;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_add", type="datetime")
     */
    private $dateAdd;

    /**
     * @var string
     *
     * @ORM\Column(name="tresorerie", type="string", length=255)
     */
    private $tresorerie;

    /**
     * @var bool
     *
     * @ORM\Column(name="is_cheque", type="boolean")
     */
    private $isCheque;

    /**
     * @var string
     *
     * @ORM\Column(name="ref_cheque", type="string", length=255, nullable=true)
     */
    private $refCheque;

    /**
     * @ORM\ManyToOne(targetEntity="SI\CoreBundle\Entity\Invoices")
     * @ORM\JoinColumn(nullable=false)
     */
    private $invoices;


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
     * Set montant
     *
     * @param string $montant
     * @return Reglement
     */
    public function setMontant($montant)
    {
        $this->montant = $montant;

        return $this;
    }

    /**
     * Get montant
     *
     * @return string 
     */
    public function getMontant()
    {
        return $this->montant;
    }

    /**
     * Set dateAdd
     *
     * @param \DateTime $dateAdd
     * @return Reglement
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
     * Set tresorerie
     *
     * @param string $tresorerie
     * @return Reglement
     */
    public function setTresorerie($tresorerie)
    {
        $this->tresorerie = $tresorerie;

        return $this;
    }

    /**
     * Get tresorerie
     *
     * @return string 
     */
    public function getTresorerie()
    {
        return $this->tresorerie;
    }

    /**
     * Set isCheque
     *
     * @param boolean $isCheque
     * @return Reglement
     */
    public function setIsCheque($isCheque)
    {
        $this->isCheque = $isCheque;

        return $this;
    }

    /**
     * Get isCheque
     *
     * @return boolean 
     */
    public function getIsCheque()
    {
        return $this->isCheque;
    }

    /**
     * Set refCheque
     *
     * @param string $refCheque
     * @return Reglement
     */
    public function setRefCheque($refCheque)
    {
        $this->refCheque = $refCheque;

        return $this;
    }

    /**
     * Get refCheque
     *
     * @return string 
     */
    public function getRefCheque()
    {
        return $this->refCheque;
    }

    /**
     * @return mixed
     */
    public function getInvoices()
    {
        return $this->invoices;
    }

    /**
     * @param mixed $invoices
     */
    public function setInvoices(Invoices $invoices)
    {
        $this->invoices = $invoices;
    }






}
