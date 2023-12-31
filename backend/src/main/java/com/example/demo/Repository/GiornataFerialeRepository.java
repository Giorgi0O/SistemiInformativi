package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.GiornataFeriale;

import java.util.Date;
import java.util.Optional;

@Repository
public interface GiornataFerialeRepository extends JpaRepository<GiornataFeriale, Long> {

    Optional<GiornataFeriale> findGiornataFerialeByDataGiornataFeriale(Date data);

    GiornataFeriale findByDataGiornataFeriale(Date data);

    boolean existsByDataGiornataFeriale(Date data);
}
