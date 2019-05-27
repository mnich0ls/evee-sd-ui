 <template>
    <a :href="event.details_url" target="_blank">
        <v-card height="100%">
            <v-img
            :src="event.thumbnail_url"
            aspect-ratio="2.75"
            ></v-img>
            <v-card-title primary-title>
            <div>
                <div class="headline font-weight-bold">{{event.title}}</div>
                <div v-if=" event.description != '0' ">class="mb-2">{{event.description}}</div>
                <div>
                    <strong>{{event.start_date | formatDateHeading}}</strong> - {{event.category}} 
                </div>
                <div>  
                    <v-chip v-if=" event.price == '0' ">Free</v-chip>
                    <v-chip v-else-if=" event.price == '-1' ">N/A</v-chip>
                    <v-chip v-else>${{event.price}}</v-chip>
                </div>
                <v-icon color="green" class="fas fa-map-marker-alt fa-1x mt-2 mr-2"></v-icon>
                <h4 style="display:inline">{{event.location}}</h4>
            </div>
            </v-card-title>
        </v-card>
    </a>    
</template>

<script>
export default {
  name: 'EventCard',
  props: {
      event
  }
}
</script>

<style>
    a {
        text-decoration: none;
    }
</style>
