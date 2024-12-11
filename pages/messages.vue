<template>
    <div class="secret-form-section flex flex-col gap-6">
        <h1>Messages created by you</h1>
        <div class="overflow-x-auto max-w-full">
          
        </div>  
    </div>
</template>
<script setup lang="ts">
const columns = [
  { key: 'lp', label: 'Lp.' },
  { key: 'creationDate', label: 'Date of Creation' },
  { key: 'readDate', label: 'Date When Read' },
  { key: 'status', label: 'Status' },
  { key: 'actions' }
];

const records = [
  {
    id: 1,
    lp: 1,
    creationDate: '2024-11-01',
    readDate: '2024-11-03',
    status: 'Opened'
  },
  {
    id: 2,
    lp: 2,
    creationDate: '2024-11-05',
    readDate: null,
    status: 'Created'
  },
  {
    id: 3,
    lp: 3,
    creationDate: '2024-11-07',
    readDate: '2024-11-10',
    status: 'Opened'
  },
  {
    id: 4,
    lp: 4,
    creationDate: '2024-11-09',
    readDate: null,
    status: 'Created'
  },
  {
    id: 5,
    lp: 5,
    creationDate: '2024-11-11',
    readDate: '2024-11-12',
    status: 'Opened'
  },
  {
    id: 6,
    lp: 6,
    creationDate: '2024-11-15',
    readDate: null,
    status: 'Created'
  }
];


const items = (row: any) => [
  [
    { label: 'Details', icon: 'i-heroicons-pencil-square-20-solid', click: () => navigateTo('/')}, 
    { label: 'Delete', icon: 'i-heroicons-trash-20-solid' }
  ]
]
</script>