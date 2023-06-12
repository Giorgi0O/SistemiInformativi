package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.R_TD;

@Repository
public interface R_TDRepository extends JpaRepository<R_TD, Long> {

}

