<?php

namespace SI\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Invoice_Items
 *
 * @ORM\Table(name="invoice__items")
 * @ORM\Entity(repositoryClass="SI\CoreBundle\Repository\Invoice_ItemsRepository")
 */
class Invoice_Items
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
     * @ORM\ManyToOne(targetEntity="SI\CoreBundle\Entity\Products", cascade={"persist", "remove"})
     */
    private $products;

    /**
     * @var int
     *
     * @ORM\Column(name="quantity", type="integer")
     */
    private $quantity;



    /**
     * @var string
     *
     * @ORM\Column(name="taux_remise", type="decimal", precision=10, scale=2, nullable=true)
     */
    private $tauxRemise;



    /**
     * @var string
     *
     * @ORM\Column(name="delivery", type="decimal", precision=10, scale=2, nullable=true)
     */
    private $delivery;




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
     * Set products
     *
     * @param string $products
     * @return Quotation_items
     */
    public function setProducts(Products $products)
    {
        $this->products = $products;

        return $this;
    }

    /**
     * Get products
     *
     * @return string
     */
    public function getProducts()
    {
        return $this->products;
    }

    /**
     * Set quantity
     *
     * @param integer $quantity
     * @return Quotation_items
     */
    public function setQuantity($quantity)
    {
        $this->quantity = $quantity;

        return $this;
    }

    /**
     * Get quantity
     *
     * @return integer
     */
    public function getQuantity()
    {
        return $this->quantity;
    }



    /**
     * Set tauxRemise
     *
     * @param string $tauxRemise
     * @return Quotation_items
     */
    public function setTauxRemise($tauxRemise)
    {
        $this->tauxRemise = $tauxRemise;

        return $this;
    }

    /**
     * Get tauxRemise
     *
     * @return string
     */
    public function getTauxRemise()
    {
        return $this->tauxRemise;
    }



    /**
     * Set delivery
     *
     * @param string $delivery
     * @return Quotation_items
     */
    public function setDelivery($delivery)
    {
        $this->delivery = $delivery;

        return $this;
    }

    /**
     * Get delivery
     *
     * @return string
     */
    public function getDelivery()
    {
        return $this->delivery;
    }
}
