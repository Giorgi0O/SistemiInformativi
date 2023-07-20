package com.example.demo.Service;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import com.example.demo.Exception.DipendenteNotExistsException;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;


public class GestKeycloak{

    public static void aggiungiKeycloak(String username){
        String token = tokenAdmin();
        String body = createBody(username);
        System.out.println( body);
        try{
            URL url = new URL( "http://localhost:8080/admin/realms/BoomBurgher/users" );

            HttpURLConnection httpPost = (HttpURLConnection) url.openConnection();
            httpPost.setRequestMethod("POST");
            httpPost.setRequestProperty("Content-Type", "application/json");
            httpPost.setRequestProperty("Authorization", "Bearer "+token);
            
            httpPost.setDoOutput(true);

            DataOutputStream pw = new DataOutputStream(httpPost.getOutputStream());
            pw.writeBytes(body);

            int responseCode = httpPost.getResponseCode();
            System.out.println(responseCode);
            if ( responseCode == 200 || responseCode == 201){
                System.out.println("aggiunto");
            }else {
                // Legge il messaggio di errore dal server
                BufferedReader errorReader = new BufferedReader(new InputStreamReader(httpPost.getErrorStream()));
                String errorLine;
                StringBuilder errorResponse = new StringBuilder();
                while ((errorLine = errorReader.readLine()) != null) {
                    errorResponse.append(errorLine);
                }
                System.out.println("Errore nella risposta del server: " + errorResponse.toString());
            }
            httpPost.disconnect();
        }catch(IOException e){
            System.out.println(e.getMessage());
        }
    }

    private static String createBody(String email){
        String body = "{ \"username\":\"" + email + "\", \"enabled\":\"true\", \"credentials\": [{\"type\":\"password\",\"value\":\""+ email.split("@")[0]+"Boom23!" + "\",\"temporary\":false}] }";        
        return body;
    }

    private static String tokenAdmin(){
        try{
            URL url = new URL( "http://localhost:8080/realms/master/protocol/openid-connect/token" );
            String body = "client_id=admin-cli&client_secret=vh4nSlFGsfzxHFvvmCNzHM4U0qVGbVRD&grant_type=password&username=admin&password=admin";
            HttpURLConnection httpPost = (HttpURLConnection) url.openConnection();
            httpPost.setRequestMethod("POST");
            httpPost.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            httpPost.setDoOutput(true);

            DataOutputStream pw = new DataOutputStream(httpPost.getOutputStream());
            pw.writeBytes(body);

            int responseCode = httpPost.getResponseCode();
            System.out.println(responseCode);
            if ( responseCode == 200 ){
                String output = "";
                BufferedReader bf = new BufferedReader(new InputStreamReader( httpPost.getInputStream()));
                String line = bf.readLine();
                while( line != null ){
                    output += line;
                    line = bf.readLine();
                }
                JsonElement je = JsonParser.parseString(output); 
                return je.getAsJsonObject().get("access_token").getAsString();
            }
        }catch(IOException e){
            System.out.println(e.getMessage());
        }
        return "";
    }

    public static void deleteUser(String us) throws DipendenteNotExistsException{
        String tokenAdmin = tokenAdmin();
        String userid = trovaUser(us);
        if( userid == null ){
            throw new DipendenteNotExistsException();
        }
        try{
            URL url = new URL( "http://localhost:8080/admin/realms/BoomBurgher/users/"+userid );

            HttpURLConnection httpGet = (HttpURLConnection) url.openConnection();
            httpGet.setRequestMethod("DELETE");
            httpGet.setRequestProperty("Authorization", "Bearer "+tokenAdmin);

            int responseCode = httpGet.getResponseCode();
            if ( responseCode == 204 || responseCode == 201){
                System.out.println("eliminato");
            }
            httpGet.disconnect();
        }catch(IOException e){
            System.out.println(e.getMessage());
        }

    }

    private static String trovaUser( String username ){
        String token = tokenAdmin();
        try{
            URL url = new URL( "http://localhost:8080/admin/realms/BoomBurgher/users?username="+username );

            HttpURLConnection httpGet = (HttpURLConnection) url.openConnection();
            httpGet.setRequestMethod("GET");
            httpGet.setRequestProperty("Authorization", "Bearer "+token);

            int responseCode = httpGet.getResponseCode();
            if ( responseCode == 200 || responseCode == 201){
                String output = "";
                BufferedReader bf = new BufferedReader(new InputStreamReader( httpGet.getInputStream()));
                String line = bf.readLine();
                while( line != null ){
                    output += line;
                    line = bf.readLine();
                }
                JsonElement je = JsonParser.parseString(output); 
                return je.getAsJsonObject().get("id").getAsString(); 
            }
            httpGet.disconnect();
        }catch(IOException e){
            System.out.println(e.getMessage());
        }
        return "";
    }    

}