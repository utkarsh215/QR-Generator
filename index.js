
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'node:fs';

//  taking url as an input from the user
inquirer
  .prompt([
   {
    message:"Enter URL",
    name:"URL"
   }
  ])
  .then((answers) => {

    //converting url into QR
    var qr_svg = qr.image(answers.URL, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream('QR.png'));
    var svg_string = qr.imageSync(answers.URL, { type: 'png' });

    //saving the url link from the user
    fs.writeFile("URL.txt" , answers.URL , (err)=>{
        if(err) throw err;
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Invalied input!");
    } else {
      console.log("Valied!");
    }
  });