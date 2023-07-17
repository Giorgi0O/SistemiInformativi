package com.example.demo.Service;

import com.example.demo.Entity.*;
import com.example.demo.Exception.DipendenteAlreadyExistsException;
import com.example.demo.Exception.DipendenteNotExistsException;
import com.example.demo.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DipendenteService {

    @Autowired
    private DipendenteRepository dipendenteRepository;
    @Autowired
    private RuoloRepository ruoloRepository;
    @Autowired
    private R_FDRepository r_FDRepository;
    @Autowired
    private R_TDRepository r_tdRepository;


    public Dipendente dipendenteCreate(Dipendente d) throws DipendenteAlreadyExistsException {
        if(dipendenteRepository.existsById(d.getId())){
            throw new DipendenteAlreadyExistsException();
        }
        /*HttpClient httpClient = HttpClientBuilder.create().build();
        String url = KEYCLOAK_BASE_URL + "/realms/" + REALM_NAME + "/users";
        List<NameValuePair> parameters = new ArrayList<>();
        parameters.add(new BasicNameValuePair("email", d.getEmail()));
        HttpPost httpPost = new HttpPost(url);
        httpPost.setHeader("Authorization", "Bearer " + getClientToken());
        httpPost.setEntity(new UrlEncodedFormEntity(parameters));
        HttpResponse response = httpClient.execute(httpPost);
        int statusCode = response.getStatusLine().getStatusCode();
        if (statusCode == 201) {
            System.out.println("Dipendente creato in keyvloack");
        } else {
            System.out.println("Dipendente non creato in keyvloack: " + statusCode);
        }*/
        return dipendenteRepository.save(d);
    }

  /*  private static String getClientToken() throws IOException {
        HttpClient httpClient = HttpClientBuilder.create().build();
        String url = KEYCLOAK_BASE_URL + "/realms/" + REALM_NAME + "/protocol/openid-connect/token";
        List<NameValuePair> parameters = new ArrayList<>();
        parameters.add(new BasicNameValuePair("grant_type", "client_credentials"));
        parameters.add(new BasicNameValuePair("client_id", CLIENT_ID));
        parameters.add(new BasicNameValuePair("client_secret", CLIENT_SECRET));
        HttpPost httpPost = new HttpPost(url);
        httpPost.setEntity(new UrlEncodedFormEntity(parameters));
        HttpResponse response = httpClient.execute(httpPost);
        return "your-access-token";
        }
   */

    @Transactional
    public Dipendente dipendenteUpdate(Long id,Dipendente nuovo) throws DipendenteNotExistsException {
        Optional<Dipendente> dipendente=dipendenteRepository.findById(id);
        if(dipendente.isPresent()){
            dipendente.get().setSede(nuovo.getSede());
            dipendente.get().setCognome(nuovo.getCognome());
            dipendente.get().setEmail(nuovo.getEmail());
            dipendente.get().setTelefono(nuovo.getTelefono());
            dipendente.get().setRuolo(nuovo.getRuolo());
            dipendente.get().setNome(nuovo.getNome());
            dipendente.get().setRtd(nuovo.getRtd());
            return dipendenteRepository.save(dipendente.get());
        }else{
            throw new DipendenteNotExistsException();
        }
    }
    
    @Transactional(readOnly = true)
    public List<Dipendente> dipendenteFindBySede( String sede ){
        return dipendenteRepository.findDipendenteBySede(sede);
    }

    @Transactional
    public void dipendenteDelete(Long id) throws DipendenteNotExistsException {
        Optional<Dipendente> dipendente=dipendenteRepository.findById(id);
        if(dipendente.isPresent()){
            r_FDRepository.deleteAll(dipendente.get().getRfd());
            r_tdRepository.deleteAll(dipendente.get().getRtd());
            dipendenteRepository.delete(dipendente.get());
        }throw new DipendenteNotExistsException();
    }

    @Transactional(readOnly = true)
    public Dipendente dipendenteFindById(Long id) throws DipendenteNotExistsException {
        Optional<Dipendente> dipendente=dipendenteRepository.findById(id);
        if(dipendente.isPresent()){
            return dipendente.get();
        }
        else{
            throw new DipendenteNotExistsException();
        }
    }

    @Transactional(readOnly = true)
    public List<Dipendente> dipendenteFindByNome(String nome){
        List<Dipendente> c=new ArrayList<>();
        for( Dipendente d : dipendenteRepository.findAll() ){
            if( d.getNome().toUpperCase().equals(nome.toUpperCase()) || d.getCognome().toUpperCase().equals(nome.toUpperCase()) ){
                c.add(d);
            }
        }
        return c;
    }
    @Transactional(readOnly = true)
    public List<Dipendente> dipendenteFiltri(String ruolo, String tipologiaContratto) throws DipendenteNotExistsException {
        if(ruolo.equals("nessuno")){
           if(!tipologiaContratto.equals("nessuno")){
               return dipendenteFindByContratto(tipologiaContratto.toLowerCase());
           }else{
               return dipendenteRepository.findAll();
           }
        }
        if(tipologiaContratto.equals("nessuno")){
            return dipendenteFindByRuolo(ruolo);
        }
        List<Dipendente> dipendenti = new ArrayList<>();
        for(Dipendente d:dipendenteFindByRuolo(ruolo)){
            if(dipendenteFindByContratto(tipologiaContratto.toLowerCase()).contains(d)){
                dipendenti.add(d);
            }
        }
        return dipendenti;
    }

    private List<Dipendente> dipendenteFindByContratto(String tipologia){
        List<Dipendente> dipendenti = new ArrayList<>();
        for(Dipendente d:dipendenteRepository.findAll()){
            if(d.getContrattoLavorativo().getTipologia().equals(tipologia)){
                dipendenti.add(d);
            }
        }
        return dipendenti;
    }

    private List<Dipendente> dipendenteFindByRuolo(String ruolo){
        Ruolo r=ruoloRepository.findRuoloByNome(ruolo);
        return dipendenteRepository.findDipendenteByRuolo(r);
    }

    @Transactional(readOnly = true)
    public List<Dipendente> listaDipendenteRead(){
        return dipendenteRepository.findAll();
    }


}

