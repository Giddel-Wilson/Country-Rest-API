<script lang="ts">
    import { Search } from 'lucide-svelte';
    import { fade } from 'svelte/transition';
    import * as Select from '$lib/components/ui/select';
  
    interface Country {
      name: {
        common: string;
      };
      population: number;
      region: string;
      capital: string[];
      flags: {
        svg: string;
        alt: string;
      };
    }
  
    let countries: Country[] = [];
    let searchQuery = '';
    let selectedRegion = '';
    let loading = true;
    
    const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  
    async function fetchCountries() {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        countries = await response.json();
        loading = false;
      } catch (error) {
        console.error('Error fetching countries:', error);
        loading = false;
      }
    }
  
    $: filteredCountries = countries
      .filter(country => 
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (!selectedRegion || country.region === selectedRegion)
      );
  
    fetchCountries();
  </script>
  
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
      <div class="relative flex-1 max-w-md">
        <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search class="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="search"
          placeholder="Search for a country..."
          bind:value={searchQuery}
          class="block w-full pl-10 pr-3 py-3 text-sm rounded-lg bg-white dark:bg-gray-800 border-none shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
        />
      </div>
  
      <Select.Root bind:value={selectedRegion}>
        <Select.Trigger class="w-52">
          <Select.Value placeholder="Filter by Region" />
        </Select.Trigger>
        <Select.Content class="bg-white dark:bg-gray-800">
          <Select.Group>
            <Select.Item value="">All Regions</Select.Item>
            {#each regions as region}
              <Select.Item value={region}>{region}</Select.Item>
            {/each}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  
    {#if loading}
      <div class="text-center py-12">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      </div>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {#each filteredCountries as country (country.name.common)}
          <a
            href={`/country/${country.name.common}`}
            class="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md hover:transform hover:scale-105 transition-transform duration-200"
            transition:fade
          >
            <img
              src={country.flags.svg}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              class="w-full h-48 object-cover"
              loading="lazy"
            />
            <div class="p-6">
              <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {country.name.common}
              </h2>
              <div class="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> {country.region}</p>
                <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
              </div>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </div>