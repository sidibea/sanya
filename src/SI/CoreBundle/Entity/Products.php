<?php

namespace SI\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Products
 *
 * @ORM\Table(name="products")
 * @ORM\Entity(repositoryClass="SI\CoreBundle\Repository\ProductsRepository")
 */
class Products
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
     * @ORM\Column(name="code", type="string", length=255)
     */
    private $code;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=255)
     */
    private $description;



    /**
     * @var string
     *
     * @ORM\Column(name="prix_de_vente", type="string", length=255)
     */
    private $prixDeVente;



    /**
     * @var string
     *
     * @ORM\Column(name="note_interne", type="string", length=255, nullable=true)
     */
    private $noteInterne;

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
     * Set code
     *
     * @param string $code
     * @return Products
     */
    public function setCode($code)
    {
        $this->code = $code;

        return $this;
    }

    /**
     * Get code
     *
     * @return string 
     */
    public function getCode()
    {
        return $this->code;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Products
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }




    /**
     * Set prixDeVente
     *
     * @param string $prixDeVente
     * @return Products
     */
    public function setPrixDeVente($prixDeVente)
    {
        $this->prixDeVente = $prixDeVente;

        return $this;
    }

    /**
     * Get prixDeVente
     *
     * @return string 
     */
    public function getPrixDeVente()
    {
        return $this->prixDeVente;
    }

    /**


    /**
     * Set noteInterne
     *
     * @param string $noteInterne
     * @return Products
     */
    public function setNoteInterne($noteInterne)
    {
        $this->noteInterne = $noteInterne;

        return $this;
    }

    /**
     * Get noteInterne
     *
     * @return string 
     */
    public function getNoteInterne()
    {
        return $this->noteInterne;
    }

    /**
     * Set dateAdd
     *
     * @param \DateTime $dateAdd
     * @return Products
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
     * @return Products
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
