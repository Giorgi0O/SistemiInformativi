package com.example.demo.Controller;


import com.example.demo.Entity.Dipendente;
import com.example.demo.Entity.R_TD;
import com.example.demo.Entity.TurnoLavorativo;
import com.example.demo.Exception.DipendenteNotExistsException;
import com.example.demo.Exception.TurnoDipendenteNotExistsException;
import com.example.demo.Exception.TurnoLavorativoNotExistsException;
import com.example.demo.Service.DipendenteService;
import com.example.demo.Service.DtoRTD;
import com.example.demo.Service.R_TDService;
import com.example.demo.Service.TurnoLavorativoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
public class R_TDController {

    @Autowired
    private R_TDService rtdService;

    @Autowired
    private DipendenteService dipendenteService;
    @Autowired
    private TurnoLavorativoService turnoLavorativoService;

    @PostMapping("/postRTD/{id}/{id_t}")
    public void createRTD(@PathVariable long id, @PathVariable long id_t, @RequestBody DtoRTD dati ) throws DipendenteNotExistsException, TurnoLavorativoNotExistsException {
        boolean s = dati.getStraordinario().equals("s");
        Dipendente d = dipendenteService.dipendenteFindById(id);
        TurnoLavorativo t = turnoLavorativoService.turnoLavorativoFindById(id_t);
        R_TD ne = new R_TD();
        ne.setDipendente(d);
        ne.setTurnoLavorativo(t);
        ne.setStraordinario(s);
        ne.setTurnoLavorativoDate(dati.getData());
        rtdService.rtdCreate(ne);
    }

    //todo da riprovare
    @PostMapping("/modificaRTD/{id}")
    public R_TD updateRTD(@PathVariable Long id,@RequestBody R_TD nuovo) throws TurnoDipendenteNotExistsException {
        return rtdService.rtdUpdate(id,nuovo);
    }

    @DeleteMapping("/deleteRTD/{id}")
    public R_TD deleteRTD(@PathVariable Long id) throws TurnoDipendenteNotExistsException {
        return rtdService.rtdDelete(id);
    }
    @GetMapping("/RTD")
    public List<R_TD> getAllRTD(){
        return rtdService.listaRtdRead();
    }

    //todo da aggiustare
    @GetMapping("/filtriRTD/{data}/{idDipendente}")
    public List<R_TD> getAllRTD(@PathVariable String data, @PathVariable Long idDipendente) throws TurnoDipendenteNotExistsException, DipendenteNotExistsException, ParseException {
        SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd");
        Date date = sd.parse(data);
        return rtdService.rtdFiltri(date,idDipendente);
    }

}
