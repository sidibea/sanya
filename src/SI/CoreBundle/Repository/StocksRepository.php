<?php

namespace SI\CoreBundle\Repository;

use Doctrine\ORM\EntityRepository;

/**
 * StocksRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class StocksRepository extends EntityRepository
{

    public function getStocks(){
        $queryBuilder = $this
            ->createQueryBuilder('s')
            ->leftJoin('s.products', 'p')
            ->select('p.code, s.dateAdd, SUM(s.qty) as Total')
            ->groupBy('p.code')
        ;

        // On récupère la Query à partir du QueryBuilder
        $query = $queryBuilder->getQuery();

        // On récupère les résultats à partir de la Query
        $results = $query->getResult();

        //var_dump($results); exit;

        // On retourne ces résultats
        return $results;
    }
}
