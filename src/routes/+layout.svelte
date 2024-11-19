<script lang="ts">
	import { browser } from '$app/environment';
	import { Moon, Sun } from 'lucide-svelte';
	import '../app.css';
  
	let darkMode = browser ? document.documentElement.classList.contains('dark') : false;
  
	function toggleTheme() {
	  darkMode = !darkMode;
	  if (browser) {
		document.documentElement.classList.toggle('dark');
		localStorage.setItem('theme', darkMode ? 'dark' : 'light');
	  }
	}
  
	// Initialize theme
	if (browser) {
	  const theme = localStorage.getItem('theme') ?? 'light';
	  darkMode = theme === 'dark';
	  if (darkMode) {
		document.documentElement.classList.add('dark');
	  }
	}
  </script>
  
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
	<header class="bg-white dark:bg-gray-800 shadow-sm">
	  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center h-16">
		  <h1 class="text-xl font-bold text-gray-900 dark:text-white">
			Where in the world?
		  </h1>
		  <button
			on:click={toggleTheme}
			class="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
		  >
			{#if darkMode}
			  <Sun class="w-4 h-4" />
			  Light Mode
			{:else}
			  <Moon class="w-4 h-4" />
			  Dark Mode
			{/if}
		  </button>
		</div>
	  </div>
	</header>
  
	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
	  <slot />
	</main>
  </div>
  
  <style>
	:global(html) {
	  font-family: 'Nunito Sans', sans-serif;
	}
  </style>