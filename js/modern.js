'use strict';
const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
function closeMenu(){navigation.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}
menuButton.addEventListener('click',()=>{const open=navigation.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
document.querySelector('#year').textContent=new Date().getFullYear();
const form=document.querySelector('#contact-form');
form.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(form);const name=String(data.get('name')).trim(),phone=String(data.get('phone')).trim(),message=String(data.get('message')).trim();if(!name||!phone||!message){document.querySelector('#form-status').textContent='Completá tu nombre, teléfono y consulta para continuar.';return;}const text=`Hola Ay Carhay!\nNombre: ${name}\nTeléfono: ${phone}\n${data.get('email')?'Email: '+data.get('email')+'\n':''}Consulta: ${message}`;window.open('https://wa.me/5491125742337?text='+encodeURIComponent(text),'_blank','noopener');document.querySelector('#form-status').textContent='Se abrió WhatsApp con tu consulta. Revisala y enviá el mensaje allí.';});
const photos=[...document.querySelectorAll('.gallery-item')];
const lightbox=document.querySelector('#lightbox');
let current=0;
function showPhoto(index){current=(index+photos.length)%photos.length;const photo=photos[current].querySelector('img');const image=lightbox.querySelector('img');image.src=photo.src;image.alt=photo.alt;document.querySelector('#photo-count').textContent=`${current+1} / ${photos.length} · ${photo.alt}`;}
photos.forEach((button,index)=>button.addEventListener('click',()=>{showPhoto(index);lightbox.showModal();document.body.classList.add('modal-open');}));
lightbox.querySelector('.lightbox-close').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('close',()=>document.body.classList.remove('modal-open'));
lightbox.addEventListener('click',event=>{if(event.target===lightbox){const rect=lightbox.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)lightbox.close();}});
document.querySelector('#previous').addEventListener('click',()=>showPhoto(current-1));
document.querySelector('#next').addEventListener('click',()=>showPhoto(current+1));
lightbox.addEventListener('keydown',event=>{if(event.key==='ArrowRight')showPhoto(current+1);if(event.key==='ArrowLeft')showPhoto(current-1);});
