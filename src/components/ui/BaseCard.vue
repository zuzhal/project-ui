<template>
  <div class="row">
    <div class="col">
      <div class="pb-card">
        <div class="pb-card-base">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pb-card {
  padding-top: 1rem;
  margin-bottom: 1rem;

  .pb-card-header {
    // color: @HeaderColor;
    font-size: 28px;
    line-height: 32px;
    padding-bottom: 1rem;
  }
}

.pb-card-base {
  border: 1px solid rgba(46, 91, 255, 0.08);
  border-radius: 1px;
  background-color: #fff;
  box-shadow: 0 0.125rem 0.25rem rgba(46, 91, 255, 0.075);
  padding: 15px;
  position: relative;

  .pb-card-subtitle {
    // color: @HeaderColor;
    font-size: 1.25em;
    padding-bottom: 15px;
  }
}
</style>
