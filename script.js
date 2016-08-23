if(document.querySelector('input[type="text"]').value == '') document.querySelector('label').className = 'dyn';
document.querySelector('input[type="text"]').addEventListener('focus', function(){document.querySelector('label').className=''});
document.querySelector('input[type="text"]').addEventListener('blur', function(){
  if(document.querySelector('input[type="text"]').value == ''){
      document.querySelector('label').className='dyn'
  }
});

document.querySelector('form').addEventListener('submit', function(e){
    if(window.fetch){
        e.preventDefault();
        e.stopPropagation();

        var headers = new Headers();
        headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        fetch('attributes.php', {
            method: 'POST',
            headers: headers,
            body: 'element=' + document.getElementById('element').value
        })
        .then(function(response){
            response.text().then(function(data) {
                if(document.querySelector('ul')) document.querySelector('ul').outerHTML = '';
                if(document.querySelector('h2')) document.querySelector('h2').outerHTML = '';
                if(document.querySelector('.err')) document.querySelector('.err').outerHTML = '';
                document.querySelector('form').insertAdjacentHTML( 'afterend',data);
            });

        });
    }
});
