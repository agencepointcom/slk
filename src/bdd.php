<?php
//  connexion par design pattern
class LoginRepository{
    //appel de la classe connexion
    public $connexion;
    public function __construct($connexion)
    {
        $this->connexion = $connexion;
    }
    //fonction pour se connecter grâce aux données de la base de données
    public function getLogin(Login $login){
          
           $query="SELECT * FROM inscription WHERE  email=:email AND
           mdp=:mdp ";
           $pdo=$this->connexion->prepare($query);
           $pdo->execute (array(
               
            'email' => $login->getEmail(),
            'mdp' => $login->getMdp(),
            
           ));
            $user=$pdo->fetch(PDO::FETCH_ASSOC);
            return $user;
    }
 
      
}