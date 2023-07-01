package com.example.demo.Controller;


import com.example.demo.Entity.Dipendente;
import com.example.demo.Entity.R_TD;
import com.example.demo.Exception.DipendenteNotExistsException;
import com.example.demo.Exception.TurnoDipendenteNotExistsException;
import com.example.demo.Service.DipendenteService;
import com.example.demo.Service.DtoTD;
import com.example.demo.Service.R_TDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
public class R_TDController {

    @Autowired
    private R_TDService rtdService;

    @Autowired
    private DipendenteService dipendenteService;

    @PostMapping("/postRTD")
    public R_TD createRTD(@RequestBody R_TD rtd){
        return rtdService.rtdCreate(rtd);
    }

    @PostMapping("/modificaRTD/{id}")
    public R_TD updateRTD(@PathVariable Long id,@RequestBody R_TD nuovo) throws TurnoDipendenteNotExistsException {
        return rtdService.rtdUpdate(id,nuovo);
    }

    @DeleteMapping("/deleteRTD/{id}")
    public void deleteRTD(@PathVariable Long id) throws TurnoDipendenteNotExistsException {
        rtdService.rtdDelete(id);
    }

    @GetMapping("/RTD")
    public List<R_TD> getAllRTD(){
        return rtdService.listaRtdRead();
    }

    @GetMapping("/filtriRTD/{data}/{idDipendente}")
    public List<R_TD> getAllRTD(@PathVariable Date data,@PathVariable Long idDipendente) throws TurnoDipendenteNotExistsException, DipendenteNotExistsException {
        Dipendente dipendente=dipendenteService.dipendenteFindById(idDipendente);
        return rtdService.rtdFiltri(data,dipendente);
    }

}
