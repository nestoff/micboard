"use strict"

import { Sortable, Plugins } from '@shopify/draggable';


import { micboard, config } from "./script.js"
import { initChart, charts } from './chart-smoothie.js'
import { renderDisplayList, updateViewOnly } from "./channelview.js"

let swappable;

function slotOrder() {
  let slotList = []
  $("#micboard > div").each(function(){
    const slot = parseInt(this.id.replace ( /[^\d.]/g, '' ))
    if (slot && (slotList.indexOf(slot) == -1)) {
      slotList.push(slot)
    }
  })
  console.log("slotlist:" + slotList)
  return slotList
}


function renderEditSlots(dl) {
  document.getElementById("eslotlist").innerHTML = ""

  var tx = micboard.transmitters;
  for(let i in dl) {
    let j = dl[i]
    let t
    if (j != 0) {
      t = document.getElementById("column-template").content.cloneNode(true);
      t.querySelector('div.col-sm').id = 'slot-' + tx[j].slot;
      updateViewOnly(t,tx[j])
    }
    else {
      t = document.createElement('div')
      t.className = "col-sm"
    }

    document.getElementById('eslotlist').appendChild(t);
  }
}

function GridLayout() {

  const containerSelector = '.drag-container';
  const containers = document.querySelectorAll(containerSelector);

  if (containers.length === 0) {
    return false;
  }

  swappable = new Sortable(containers, {
    draggable: '.col-sm',
    mirror: {
      appendTo: containerSelector,
      constrainDimensions: true,
    },

    plugins: [Plugins.ResizeMirror]
  });
  renderEditSlots(calcEditSlots())
  swappable.on('sortable:stop', (evt) => {
    console.log("DROP")
    console.log(evt.dragEvent)

    setTimeout(onDrop, 125, evt.dragEvent.source, evt.oldContainer.id, evt.newContainer.id)
  });

  return swappable;
}

function onDrop(id, src, dst) {
  let slot = parseInt(id.id.replace( /[^\d.]/g, '' ))
  console.log("DSLOT: " + slot)
  micboard.displayList = slotOrder()

  const eslots = calcEditSlots()
  renderEditSlots(eslots)


  if (src == 'micboard' && dst =='micboard') {
  }

  else if (src == 'eslotlist' && dst =='micboard') {
    charts[slot] = initChart(document.getElementById(id.id))
  }

  else if (src == 'micboard' && dst =='eslotlist') {
    charts[slot].slotChart.stop()
  }


}

function calcEditSlots() {
  const slots = config['slots']
  let output = []
  slots.forEach(function(slot) {
    if (micboard.displayList.indexOf(slot.slot) == -1 ){
      output.push(slot.slot)
    }
  })

  return output;
}


export function groupEditToggle() {
  const container = document.getElementsByClassName('container-fluid')[0]
  if(container.classList.contains('sidebar-open')) {
    container.classList.remove('sidebar-open')
    swappable.destroy()
  }
  else {
    container.classList.add('sidebar-open')
    GridLayout()
  }
}

export function updateEditor(group) {
  document.getElementById('sidebarTitle').innerHTML = "Group " + group
  document.getElementById('groupTitle').value = micboard.groups[group]['title']
}


export function initEditor() {
  $("#editorClose").on('click', function(){
    groupEditToggle()
  })

  $("#editorSave").on('click', function(){
    submitSlotUpdate()
  })
}

function submitSlotUpdate() {
  const url = 'api/group';

  const update = {
    'group': micboard.group,
    'title': document.getElementById('groupTitle').value,
    'slots': slotOrder()
  }


  console.log(update)
  postJSON(url,update)
  groupEditToggle()
}


function postJSON(url,data) {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(response => console.log('Success:', JSON.stringify(response)))
  .catch(error => console.error('Error:', error));
}