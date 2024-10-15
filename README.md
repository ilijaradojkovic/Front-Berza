Ovo je glavni front i tu se nalaze sve operacije, njega smestamo u FAKE_NAZIVKAZINA_FRONT u iframe

Podizanje:
1. npm run dev:nazivKazina
    Mi pravimo za svaki kazino novi file naziva .env.nazivKazina i u njemu ubacujemo env varijable za taj kazino
    I onda u package.json u scripts delu moramo da registrujemo tu skriptu(.env.nazivkazina) sa  "dev:nazivkazina": "vite --mode nazivkazina"
    
ENV varijable:

1. VITE_BASE_URL_REST ovo je base url za casino, ako radimo na lokalnoj maisni pisemo localhost, ako dizemo na server 195.62.77.51, ovo je za rest operacija pa ce pocinjati sa http://
2. VITE_BASE_URL_SOCKET ovo je za socket operacije pa ce pocinjati sa ws://


Takodje treba omoguciti 
  // server:{
  //   host: '0.0.0.0'
  // }
  u vite.config.js ako podizemo na nas server
