package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "r_fd" , uniqueConstraints = {@UniqueConstraint(columnNames = {"dipendente_id", "giornata_ferie_id"})} )
public class R_FD {

    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    @JoinColumn(name = "dipendente_id")
    private Dipendente dipendente;

    @ManyToOne
    @JoinColumn(name = "giornata_ferie_id")
    private GiornataFeriale giornataFeriale;


}
