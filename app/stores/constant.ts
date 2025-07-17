export const useConstantStore = defineStore("useConstantStore", () => {
  const topbarTitle = ref("Dashboard");
  const sidebarShow = ref(false);

  function setTitle(title: string) {
    topbarTitle.value = title;
  }

  function toggleSidebar() {
    sidebarShow.value = !sidebarShow.value;
  }

  return {
    topbarTitle,
    sidebarShow,
    setTitle,
    toggleSidebar,
  };
});
