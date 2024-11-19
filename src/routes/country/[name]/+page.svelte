<script lang="ts">
  import { onMount } from 'svelte';
  import { ArrowLeft } from 'lucide-svelte';
  import { page } from '$app/stores';

  interface CountryDetail {
    name: {
      common: string;
      nativeName: Record<string, { common: string }>;
    };
    population: number;
    region: string;
    subregion: string;
    capital: string[];
    tld: string[];
    currencies: Record<string, { name: string }>;
    languages: Record<string, string>;
    borders: string[];
    flags: {
      svg: string;
      alt: string;
    };
  }

  let country: CountryDetail | null = null;
  let borderCountries: { name: string; common: string }[] = [];
  let loading = true;

  onMount(async () => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${$page.params.name}?fullText=true`
      );
      const data = await response.json();
      country = data[0];

      if (country?.borders) {
        const borderResponse = await fetch(
          `https://restcountries.com/v3.1/alpha?codes=${country.borders.join(',')}`
        );
        const borderData = await borderResponse.json();
        borderCountries = borderData.map((c: any) => ({
          name: c.name.common,
          common: c.name.common
        }));
      }
    } catch (error) {
      console.error('Error fetching country data:', error);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>{country?.name.common || 'Loading...'} | REST Countries</title>
</svelte:head>

<div class="space-y-12">
  <a
    href="/"
    class="inline-flex items-center px-6 py-2 text-sm font-medium text-gray-700 dark:text-white bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700"
  >
    <ArrowLeft class="w-4 h-4 mr-2" />
    Back
  </a>

  {#if loading}
    <div class="text-center py-12">
      <span class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"></span>
    </div>
  {:else if country}
    <div class="grid md:grid-cols-2 gap-12">
      <img
        src={country.flags.svg}
        alt={country.flags.alt || `Flag of ${country.name.common}`}
        class="w-full h-auto shadow-md"
      />

      <div class="space-y-8">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          {country.name.common}
        </h1>

        <div class="grid md:grid-cols-2 gap-8">
          <div class="space-y-2 text-sm">
            <p class="text-gray-700 dark:text-gray-300">
              <strong>Native Name:</strong>
              {Object.values(country.name.nativeName)[0]?.common || 'N/A'}
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              <strong>Population:</strong>
              {country.population.toLocaleString()}
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              <strong>Region:</strong>
              {country.region}
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              <strong>Sub Region:</strong>
              {country.subregion || 'N/A'}
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              <strong>Capital:</strong>
              {country.capital?.[0] || 'N/A'}
            </p>
          </div>

          <div class="space-y-2 text-sm">
            <p class="text-gray-700 dark:text-gray-300">
              <strong>Top Level Domain:</strong>
              {country.tld?.[0] || 'N/A'}
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              <strong>Currencies:</strong>
              {Object.values(country.currencies || {})
                .map(c => c.name)
                .join(', ') || 'N/A'}
            </p>
            <p class="text-gray-700 dark:text-gray-300">
              <strong>Languages:</strong>
              {Object.values(country.languages || {}).join(', ') || 'N/A'}
            </p>
          </div>
        </div>

        {#if borderCountries.length > 0}
          <div>
            <h2 class="text-gray-900 dark:text-white font-semibold mb-4">
              Border Countries:
            </h2>
            <div class="flex flex-wrap gap-2">
              {#each borderCountries as border}
                <a
                  href="/country/{border.common}"
                  class="px-4 py-1 text-sm bg-white dark:bg-gray-800 shadow-sm rounded-sm hover:shadow-md transition-shadow text-gray-700 dark:text-gray-300"
                >
                  {border.name}
                </a>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>
  {:else}
    <p class="text-center text-gray-700 dark:text-gray-300">Country not found</p>
  {/if}
</div>