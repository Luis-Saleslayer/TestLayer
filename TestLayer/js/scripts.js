let defaultEndpoint = 'https://swapi.dev/api/planets/';

let heartIconText = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16"><path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>';

let likes = {"AnakinSkywalker": false,
  "BeruWhitesun lars": false,
  "BiggsDarklighter": false,
  "C-3PO": false,
  "ClieggLars": false,
  "DarthVader": false,
  "LukeSkywalker": false,
  "OwenLars": false,
  "R5-D4": false,
  "ShmiSkywalker": false};
loadEndpoint(defaultEndpoint);

function loadEndpoint(endpoint){

  let request = new XMLHttpRequest(endpoint)
  const container = document.getElementById('root');



  request.open('GET', endpoint, true)
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {

      data.results.forEach((planet) => {

        const div = document.createElement('div')
        div.setAttribute('class', 'col-md-4')

        const innerDiv = document.createElement('div')
        innerDiv.setAttribute('class', 'card mb-4 yellow-background')
        div.appendChild(innerDiv)

        const innerImg = document.createElement('img')
        innerImg.setAttribute('class', 'card-img-top')
        innerImg.setAttribute('src', 'assets\\planets\\' + planet.name + ".png")
        innerDiv.appendChild(innerImg)

        const innerDiv2 = document.createElement('div')
        innerDiv2.setAttribute('class', 'card-body')
        innerDiv.appendChild(innerDiv2)

        const innerSmall = document.createElement('h2')
        innerSmall.setAttribute('class', 'text-muted text-center')
        innerSmall.textContent = planet.name
        innerDiv2.appendChild(innerSmall)

        const innerP = document.createElement('p')
        innerP.setAttribute('class', 'card-text')
        innerP.textContent = "Periodo Rotación: " + planet.rotation_period
        innerDiv2.appendChild(innerP)

        const innerP2 = document.createElement('p')
        innerP2.setAttribute('class', 'card-text')
        innerP2.textContent = "Periodo de orbitación: " + planet.orbital_period
        innerDiv2.appendChild(innerP2)

        const innerP3 = document.createElement('p')
        innerP3.textContent = "Población: " + planet.population
        innerP3.setAttribute('class', 'card-text')
        innerDiv2.appendChild(innerP3)

        const innerDiv3 = document.createElement('div')
        innerDiv3.setAttribute('class', 'd-flex justify-content-between align-items-center')
        innerDiv2.appendChild(innerDiv3)
        
        const innerDiv4 = document.createElement('div')
        innerDiv4.setAttribute('class', 'btn-group')
        innerDiv3.appendChild(innerDiv4)

        const innerButton = document.createElement('button')
        innerButton.setAttribute('type', 'button')
        innerButton.setAttribute('data-bs-toggle', 'modal')
        innerButton.setAttribute('data-bs-target', '#exampleModal');
        innerButton.setAttribute('class', 'btn btn-sm btn-outline-dark')
        innerButton.textContent = "Residentes"
        innerButton.onclick = function(event){
          setTimeout(
            function(){createModal( planet.residents, planet.name)}
            , (Math.floor(Math.random()*5) + 1 * 1000));
        };
        innerDiv4.appendChild(innerButton);



        const heartDiv = document.createElement('div')

        let idName = planet.name.replace(' ','')
        heartDiv.setAttribute('id', idName);
        if(idName in likes && likes[idName] == true){
          heartDiv.setAttribute('class', 'activeHeart');
        }else{
          heartDiv.setAttribute('class', '');
        }

        heartDiv.onclick = function(){
          if(likes[idName] == true){
            likes[idName]  = false;
            this.setAttribute('class', '');
          }else{
            likes[idName]  = true;
            this.setAttribute('class', 'activeHeart');
          }
        }
        heartDiv.innerHTML = heartIconText;
        innerDiv3.appendChild(heartDiv);

        

        container.appendChild(div)


      })
    } else {
      console.log('error')
    }
  }

  request.send()
}
 

function createModal(elements, planet){
  const innerAccordion = document.createElement('div')
  innerAccordion.setAttribute('class', 'row');
  innerAccordion.setAttribute('id', 'residentesModal');
  const modalName = document.getElementById('exampleModalLabel');
  const modalBody = document.getElementById('modalBody');
  modalBody.innerHTML= '';
  modalBody.appendChild(innerAccordion);

  const modal = document.getElementById('exampleModal');
  modal.addEventListener('hide.bs.modal', function(){
    modalBody.innerHTML= '';
  });
  
  elements.forEach((people) => {
    createAccordionItem(people, planet, innerAccordion);
    
  });
  return innerAccordion;
}


function createAccordionItem(people, planet, planetAccordion){
  let peopleRequest = new XMLHttpRequest()
  const modalDiv = document.createElement('div')
  
  let peopleId = people.substring(people.length - 4, people.length - 2).replace('/','');

  
  peopleRequest.open('GET', people.replace('http','https'), true);
  peopleRequest.onload = function () {
    
    var data = JSON.parse(this.response)

    if (peopleRequest.status >= 200 && peopleRequest.status < 400) {

      modalDiv.setAttribute('class', 'card mb-4 yellow-background');

      const innerImg = document.createElement('img')
      innerImg.setAttribute('class', 'card-img-top resize-img')
      innerImg.setAttribute('src', 'assets\\characters\\' + data.name.replace(/\s/g, "") + ".png")
      modalDiv.appendChild(innerImg)

      const innerDiv2 = document.createElement('div')
      innerDiv2.setAttribute('class', 'card-body')
      modalDiv.appendChild(innerDiv2)

      const innerDiv3 = document.createElement('div')
      innerDiv3.setAttribute('class', ' justify-content-between align-items-center')
      innerDiv2.appendChild(innerDiv3)

      const innerSmall = document.createElement('small')
      innerSmall.setAttribute('class', 'text-muted')
      innerSmall.textContent = data.name
      innerDiv3.appendChild(innerSmall)


      if(Math.round(Math.random()) == 1){
        const heartDiv = document.createElement('div')
          let idName = data.name.replace(' ','')
          heartDiv.setAttribute('id', idName);
          // likes[idName] = false;
          if(likes[idName] == true){
            heartDiv.setAttribute('class', 'activeHeart text-center m-3');
          }else if(likes[idName] == false){
            heartDiv.setAttribute('class', 'text-center m-3');
          }

          heartDiv.onclick = function(){
            if(likes[idName] == true){
              likes[idName]  = false;
              this.setAttribute('class', 'text-center m-3');
            }else{
              likes[idName]  = true;
              this.setAttribute('class', 'activeHeart text-center m-3');
            }
          }

          heartDiv.innerHTML = heartIconText;
          innerDiv3.appendChild(heartDiv);
      }else{
        var statusChanged = false;
        const innerDiv2 = document.createElement('form')
        innerDiv2.setAttribute('class', 'text-center mt-3')

        let idName = data.name.replace(' ','')
        // likes[idName] = false;
        const innerSelect = document.createElement('select')
        innerSelect.setAttribute('name', 'like')
        innerSelect.setAttribute('id', idName)
        innerSelect.onchange = function(e){

          statusChanged = !statusChanged;
        }

        const innerSelectTrueOption = document.createElement('option')
        innerSelectTrueOption.setAttribute('value', 'true')
        innerSelectTrueOption.textContent = 'favorito'

        const innerSelectFalseOption = document.createElement('option')
        innerSelectFalseOption.setAttribute('value', 'false')
        innerSelectFalseOption.textContent = 'no favorito'
        
        if(likes[idName] == true){
          innerSelectTrueOption.setAttribute('selected', 'selected');
        }else{
          innerSelectFalseOption.setAttribute('selected', 'selected');
        }
        innerSelect.appendChild(innerSelectFalseOption)
        innerSelect.appendChild(innerSelectTrueOption)

        const innerSubmit = document.createElement('input')
        innerSubmit.setAttribute('value', 'Actualizar')
        innerSubmit.setAttribute('type', 'submit')
        innerSubmit.setAttribute('class', 'mt-2 btn update-button btn-sm btn-outline-dark')

        innerDiv2.onsubmit = function(e){
          e.preventDefault();

         if(statusChanged == true){
              likes[idName]  = !likes[idName];

              if( likes[idName] == true){
                alert("Ahora SI es favorito");   
              }else if (likes[idName] == false){
                alert("Ahora NO es favorito");   
              }

              statusChanged = false;
            }
        }

        innerDiv2.appendChild(innerSelect)
        innerDiv2.appendChild(innerSubmit)
        innerDiv3.appendChild(innerDiv2);


      }

      const colDiv = document.createElement('div')
      colDiv.setAttribute('class', 'col-md-4')
      colDiv.appendChild(modalDiv)



      planetAccordion.appendChild(colDiv);
    }

  }
  
  peopleRequest.send()

  return modalDiv;
}



