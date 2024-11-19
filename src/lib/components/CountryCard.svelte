<script lang="ts">
  import { Card, CardContent } from '$lib/components/ui/card';

  export let country;
</script>

<a href={`/country/${country.cca3}`} class="block">
  <Card class="h-full transition-transform hover:scale-105">
    <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} class="w-full h-40 object-cover" />
    <CardContent class="p-6">
      <h2 class="text-xl font-bold mb-4">{country.name.common}</h2>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
    </CardContent>
  </Card>
</a>