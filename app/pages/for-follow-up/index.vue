<script setup lang="ts">

    onMounted(async () => {
        const res = await getMeetingSummary()
        console.log(res)
    })

    async function getMeetingSummary() {
        const response = await fetch('/api/zoom/meeting_summary', {
            method: 'POST'
        })
        const res = await response.json()

        return res
    }
</script>

<template>
    <div>
        <h1>For Follow Up Page</h1>
    </div>
</template>
