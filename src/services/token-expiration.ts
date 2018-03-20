import {Injectable} from "@angular/core";

@Injectable()

/**
 * J'ai réalisé cette classe pour pousser la vérification des tokens un peu plus loin.
 * Vous pouvez la réutiliser dans vos projets sans soucis. Je ne vous demande pas de tout
 * comprendre, mais pour les plus curieux, ça peut être sympa ;)
 */
export class TokenExpiration {

  /**
   * On vérifie si le token va bientôt expirer
   *
   * @param token
   * @param {number} offsetSeconds
   * @returns {boolean}
   */
  isTokenExpired(token, offsetSeconds ?: number) {

    //  On récupère la date d'expiration du token
    let date = this.getTokenExpirationDate(token);

    //  Si aucun paramètre n'est rentré, on le passe à 0 par défaut
    offsetSeconds = offsetSeconds || 0;

    //  SI pas de date : null
    if (date === null) {
      return false;
    }

    /**
     * On retourne un boolean pour savoir si la date récupérée est supérieure à la date
     * actuelle (avec en supplément les secondes en paramètres si renseignées)
     */
    return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
  }

  /**
   * Retourne la date d'expiration du token
   *
   * @param token
   * @returns {any}
   */
  getTokenExpirationDate(token) {
    //  On décode le token
    let decoded = this.decodeToken(token);

    //  On vérifie que le token décodé possède la propriétée "exp", pour expiration.
    if (!decoded.hasOwnProperty('exp')) {
      return null;
    }

    //  Date de maintenant
    let date = new Date(0);

    //  On ajoute les secondes récupérées dans le token et on retourne
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  /**
   * Fonction pour décoder le token
   * @param token
   * @returns {any}
   */
  decodeToken(token) {

    //  Notre token est censé être composé de 3 parties, séparées de "."
    let parts = token.split('.');

    //  Si on a pas 3 parties => c'est pas bon, erreur
    if (parts.length !== 3) {
      throw new Error('The inspected token doesn\'t appear to be a JWT. Check to make sure it has three parts and see https://jwt.io for more.');
    }

    //  On décode notre première partie
    let decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token.');
    }

    //  C'est la première partie qui nous intéresse
    return JSON.parse(decoded);
  }

  /**
   * Décodage en base 64
   *
   * @param str
   * @returns {string}
   */
  base64Decode(str) {
    //  Tous les caractères possibles
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';

    str = String(str).replace(/=+$/, '');
    if (str.length % 4 === 1) {
      throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (
      // initialize result and counters
      let bc = 0, bs = void 0, buffer = void 0, idx = 0;
      // get next character
      (buffer = str.charAt(idx++));
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer &&
      ((bs = bc % 4 ? bs * 64 + buffer : buffer),
        // and if not first of each 4 characters,
        // convert the first 8 bits to one ascii character
      bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0) {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer);
    }
    return output;
  }

  /**
   *
   * @param str
   * @returns {string}
   */
  urlBase64Decode(str) {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: {
        break;
      }
      case 2: {
        output += '==';
        break;
      }
      case 3: {
        output += '=';
        break;
      }
      default: {
        throw 'Illegal base64url string!';
      }
    }
    return this.b64DecodeUnicode(output);
  }

  /**
   *
   * @param str
   * @returns {string}
   */
  b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map
      .call(this.base64Decode(str), function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''));
  }

}