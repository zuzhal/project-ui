<template>
    <set-up-dialog></set-up-dialog>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import SetUpDialog from '../dialogs/SetUpDialog.vue'

export default defineComponent({
    props: {
        experimentName: String,
    },
    components: {
        SetUpDialog
    },
    data() {
        
    },
});
</script>