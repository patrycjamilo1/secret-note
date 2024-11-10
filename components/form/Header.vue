<template>
    <div class="form-header">
        <font-awesome icon="lock" />
        <h1>Secret Note</h1>
    </div>
</template>

<style scoped>
.form-header {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(0.8125rem, 0.2537rem + 2.7941vw, 2rem);
    svg {
        font-size: clamp(1.25rem, 0.6618rem + 2.9412vw, 2.5rem);
    }
    gap: 20px;
    h1 {
        margin: 0;
        text-transform: uppercase;
        font-weight: bold;
    }
}
</style>