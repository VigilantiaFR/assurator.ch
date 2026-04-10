<?php
header('Content-Type: application/json');

function sanitize_text_post($key) {
    $value = filter_input(INPUT_POST, $key, FILTER_UNSAFE_RAW);
    if ($value === null || $value === false) {
        return '';
    }

    $value = trim((string) $value);
    $value = strip_tags($value);
    return str_replace(["\r", "\n"], ' ', $value);
}

function format_delivery_timing($value) {
    if (preg_match('/^\d{4}-\d{2}$/', $value)) {
        list($year, $month) = explode('-', $value);
        return $month . '/' . $year;
    }
    return $value;
}

$response = ['success' => false, 'message' => 'Une erreur inattendue est survenue.'];

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response['message'] = 'Méthode de requête invalide.';
    echo json_encode($response);
    exit;
}

$to = filter_input(INPUT_POST, 'recipient_email', FILTER_SANITIZE_EMAIL);
if (empty($to)) {
    $to = 'vigilantiafr@gmail.com';
}

$form_source = sanitize_text_post('form_source');
if (empty($form_source)) {
    $form_source = 'main_form';
}

// Core fields for the prénatal landing
$product_type = sanitize_text_post('product_type');
$npa = sanitize_text_post('npa');
$locality = sanitize_text_post('locality');
$pregnancy_status = sanitize_text_post('pregnancy_status');
$delivery_timing = sanitize_text_post('delivery_timing');
$current_insurer = sanitize_text_post('current_insurer');
$desired_coverage = sanitize_text_post('desired_coverage');
$lca_need = sanitize_text_post('lca_need');
$budget_range = sanitize_text_post('budget_range');
$travel_type = sanitize_text_post('travel_type');
$destination_zone = sanitize_text_post('destination_zone');
$departure_timing = sanitize_text_post('departure_timing');
$trip_duration = sanitize_text_post('trip_duration');
$travelers_count = sanitize_text_post('travelers_count');
$travel_coverage = sanitize_text_post('travel_coverage');
$animal_type = sanitize_text_post('animal_type');
$pet_breed = sanitize_text_post('pet_breed');
$coverage_level = sanitize_text_post('coverage_level');
$installation_timing = sanitize_text_post('installation_timing');
$household_status = sanitize_text_post('household_status');
$origin_insurer = sanitize_text_post('origin_insurer');
$first_name = sanitize_text_post('first_name');
$phone = sanitize_text_post('phone');
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$email = $email ? trim($email) : '';
$consent = sanitize_text_post('consent');
$lpd_agreement = sanitize_text_post('lpd_agreement');

// Legacy compatibility fields (optional)
$age_range = sanitize_text_post('age_range');
$franchise = sanitize_text_post('franchise');
$accident_coverage = sanitize_text_post('accident_coverage');
$last_name = sanitize_text_post('last_name');
$country_code = sanitize_text_post('country_code');
$full_phone = sanitize_text_post('full_phone');

if (!empty($full_phone)) {
    $phone_display = $full_phone;
} elseif (!empty($country_code) && !empty($phone)) {
    $phone_display = $country_code . ' ' . $phone;
} else {
    $phone_display = $phone;
}

if (strtolower($consent) === 'on') {
    $consent = 'on';
}

$is_prenatal_form = ($form_source === 'prenatal_form')
    || !empty($pregnancy_status)
    || !empty($delivery_timing)
    || in_array($product_type, ['ASSURANCE_PRENATALE', 'PRIVATE_INSURANCE', 'PRENATALE'], true);
$is_lca_form = ($form_source === 'lca_form')
    || !empty($lca_need)
    || !empty($budget_range);
$is_travel_form = ($form_source === 'travel_form')
    || !empty($travel_type)
    || !empty($destination_zone)
    || !empty($departure_timing)
    || !empty($trip_duration)
    || !empty($travelers_count)
    || !empty($travel_coverage)
    || ($product_type === 'VOYAGE');
$is_animals_form = ($form_source === 'animals_form')
    || !empty($animal_type)
    || !empty($pet_breed)
    || !empty($coverage_level)
    || ($product_type === 'ANIMAUX');
$is_resident_form = ($form_source === 'resident_form')
    || !empty($installation_timing)
    || !empty($household_status)
    || ($product_type === 'NOUVEAU_RESIDENT');

$required_fields = [
    'phone_display' => 'Téléphone',
    'consent' => "Acceptation d'être recontacté",
];

if ($is_prenatal_form) {
    $required_fields = [
        'product_type' => "Type d'assurance",
        'npa' => 'NPA',
        'locality' => 'Localité',
        'pregnancy_status' => 'Statut de grossesse',
        'delivery_timing' => 'Période prévue',
        'first_name' => 'Prénom',
        'phone_display' => 'Téléphone',
        'email' => 'Email',
        'consent' => "Acceptation d'être recontacté",
    ];
} elseif ($is_lca_form) {
    $required_fields = [
        'product_type' => "Type d'assurance",
        'lca_need' => 'Besoin LCA',
        'npa' => 'NPA',
        'locality' => 'Localité',
        'age_range' => "Tranche d'âge",
        'first_name' => 'Prénom',
        'phone_display' => 'Téléphone',
        'email' => 'Email',
        'consent' => "Acceptation d'être recontacté",
    ];
} elseif ($is_travel_form) {
    $required_fields = [
        'product_type' => "Type d'assurance",
        'travel_type' => 'Type de voyage',
        'npa' => 'NPA',
        'locality' => 'Localité',
        'destination_zone' => 'Zone de destination',
        'departure_timing' => 'Mois de départ',
        'trip_duration' => 'Durée du voyage',
        'first_name' => 'Prénom',
        'phone_display' => 'Téléphone',
        'email' => 'Email',
        'consent' => "Acceptation d'être recontacté",
    ];
} elseif ($is_animals_form) {
    $required_fields = [
        'product_type' => "Type d'assurance",
        'animal_type' => "Type d'animal",
        'npa' => 'NPA',
        'locality' => 'Localité',
        'age_range' => "Âge de l'animal",
        'first_name' => 'Prénom',
        'phone_display' => 'Téléphone',
        'email' => 'Email',
        'consent' => "Acceptation d'être recontacté",
    ];
} elseif ($is_resident_form) {
    $required_fields = [
        'product_type' => "Type d'assurance",
        'npa' => 'NPA',
        'locality' => 'Localité',
        'age_range' => "Tranche d'âge",
        'installation_timing' => "Mois d'installation",
        'household_status' => 'Statut',
        'first_name' => 'Prénom',
        'phone_display' => 'Téléphone',
        'email' => 'Email',
        'consent' => "Acceptation d'être recontacté",
    ];
} elseif ($form_source === 'main_form') {
    $required_fields = [
        'product_type' => "Type d'assurance",
        'npa' => 'NPA',
        'locality' => 'Localité',
        'age_range' => "Tranche d'âge",
        'franchise' => 'Franchise',
        'current_insurer' => 'Assureur actuel',
        'first_name' => 'Prénom',
        'last_name' => 'Nom',
        'phone_display' => 'Téléphone',
        'email' => 'Email',
        'consent' => "Acceptation d'être recontacté",
    ];
}

$missing_fields = [];
foreach ($required_fields as $field_name => $field_label) {
    if (empty($$field_name)) {
        $missing_fields[] = $field_label;
    }
}

if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $missing_fields[] = 'Email valide';
}

if (!empty($missing_fields)) {
    $response['message'] = 'Veuillez remplir tous les champs requis correctement: ' . implode(', ', $missing_fields);
    echo json_encode($response);
    exit;
}

$form_type = ($form_source === 'exit_intent') ? 'Exit Intent' : 'Principal';

$product_labels = [
    'LAMAL' => 'Assurance LAMal',
    'LCA' => 'Assurance LCA',
    'PRENATALE' => 'Assurance prénatale',
    'ASSURANCE_PRENATALE' => 'Assurance prénatale',
    'PRIVATE_INSURANCE' => 'Assurance prénatale',
    'NOUVEAU_RESIDENT' => 'Nouveau résident',
    'VOYAGE' => 'Assurance voyage',
    'ANIMAUX' => 'Assurance animaux',
];
$product_label = isset($product_labels[$product_type]) ? $product_labels[$product_type] : $product_type;

$subject_prefix = $is_prenatal_form
    ? 'Prénatalité'
    : ($is_lca_form
        ? 'Assurance LCA'
        : ($is_travel_form ? 'Assurance voyage' : ($is_animals_form ? 'Assurance animaux' : ($is_resident_form ? 'Nouveau résident' : 'Comparaison'))));
$subject = 'Nouvelle demande Assurator.ch - ' . $subject_prefix . ' (' . $form_type . ')';

$email_body = "Une nouvelle demande a été soumise via Assurator.ch (" . $form_type . "):\n\n";
$email_body .= "Type d'assurance: " . $product_label . "\n";
$email_body .= "NPA / Localité: " . $npa . " / " . $locality . "\n";

if ($is_prenatal_form) {
    $pregnancy_labels = [
        'en_projet' => 'En projet',
        'enceinte' => 'Enceinte',
        'accouchement_bientot' => 'Accouchement prévu bientôt',
    ];
    $pregnancy_status_display = isset($pregnancy_labels[$pregnancy_status]) ? $pregnancy_labels[$pregnancy_status] : $pregnancy_status;
    $email_body .= "Statut: " . $pregnancy_status_display . "\n";
    $email_body .= "Période prévue: " . format_delivery_timing($delivery_timing) . "\n";

    if (!empty($current_insurer)) {
        $email_body .= "Assureur actuel: " . $current_insurer . "\n";
    }
    if (!empty($desired_coverage)) {
        $email_body .= "Couverture recherchée: " . $desired_coverage . "\n";
    }
} elseif ($is_lca_form) {
    $lca_need_labels = [
        'hospitalisation' => 'Hospitalisation complémentaire',
        'ambulatoire' => 'Soins ambulatoires',
        'dentaire' => 'Dentaire',
        'vision' => 'Vision et lunettes',
        'medecines_douces' => 'Médecines alternatives',
        'globale' => 'Couverture globale',
    ];
    $lca_need_display = isset($lca_need_labels[$lca_need]) ? $lca_need_labels[$lca_need] : $lca_need;
    $budget_range_labels = [
        'moins_50' => 'Moins de CHF 50',
        '50_100' => 'CHF 50 - 100',
        '100_150' => 'CHF 100 - 150',
        '150_plus' => 'Plus de CHF 150',
    ];
    $budget_range_display = isset($budget_range_labels[$budget_range]) ? $budget_range_labels[$budget_range] : $budget_range;

    $email_body .= "Besoin principal: " . $lca_need_display . "\n";
    if (!empty($age_range)) {
        $email_body .= "Tranche d'âge: " . $age_range . "\n";
    }
    if (!empty($current_insurer)) {
        $email_body .= "Assureur actuel: " . $current_insurer . "\n";
    }
    if (!empty($budget_range_display)) {
        $email_body .= "Budget mensuel visé: " . $budget_range_display . "\n";
    }
} elseif ($is_travel_form) {
    $travel_type_labels = [
        'loisir' => 'Loisir',
        'affaires' => 'Affaires',
        'etudes' => 'Études',
        'long_sejour' => 'Long séjour',
    ];
    $destination_zone_labels = [
        'europe' => 'Europe',
        'monde_hors_us_ca' => 'Monde hors USA/Canada',
        'usa_canada' => 'USA / Canada',
        'monde_entier' => 'Monde entier',
    ];
    $trip_duration_labels = [
        '1_7_jours' => '1-7 jours',
        '8_15_jours' => '8-15 jours',
        '16_30_jours' => '16-30 jours',
        '1_3_mois' => '1-3 mois',
        '3_mois_plus' => 'Plus de 3 mois',
    ];
    $travel_coverage_labels = [
        'essentielle' => 'Essentielle',
        'standard' => 'Standard',
        'renforcee' => 'Renforcée',
    ];
    $travel_type_display = isset($travel_type_labels[$travel_type]) ? $travel_type_labels[$travel_type] : $travel_type;
    $destination_zone_display = isset($destination_zone_labels[$destination_zone]) ? $destination_zone_labels[$destination_zone] : $destination_zone;
    $trip_duration_display = isset($trip_duration_labels[$trip_duration]) ? $trip_duration_labels[$trip_duration] : $trip_duration;
    $travel_coverage_display = isset($travel_coverage_labels[$travel_coverage]) ? $travel_coverage_labels[$travel_coverage] : $travel_coverage;

    $email_body .= "Type de voyage: " . $travel_type_display . "\n";
    $email_body .= "Zone de destination: " . $destination_zone_display . "\n";
    $email_body .= "Mois de départ: " . format_delivery_timing($departure_timing) . "\n";
    $email_body .= "Durée du voyage: " . $trip_duration_display . "\n";
    if (!empty($current_insurer)) {
        $email_body .= "Assureur actuel: " . $current_insurer . "\n";
    }
    if (!empty($travelers_count)) {
        $email_body .= "Nombre de voyageurs: " . $travelers_count . "\n";
    }
    if (!empty($travel_coverage_display)) {
        $email_body .= "Niveau de couverture souhaité: " . $travel_coverage_display . "\n";
    }
} elseif ($is_animals_form) {
    $animal_labels = [
        'chien' => 'Chien',
        'chat' => 'Chat',
    ];
    $animal_type_display = isset($animal_labels[$animal_type]) ? $animal_labels[$animal_type] : $animal_type;
    $coverage_labels = [
        'essentielle' => 'Essentielle',
        'equilibree' => 'Équilibrée',
        'renforcee' => 'Renforcée',
    ];
    $coverage_level_display = isset($coverage_labels[$coverage_level]) ? $coverage_labels[$coverage_level] : $coverage_level;

    $email_body .= "Type d'animal: " . $animal_type_display . "\n";
    if (!empty($age_range)) {
        $email_body .= "Âge de l'animal: " . $age_range . "\n";
    }
    if (!empty($pet_breed)) {
        $email_body .= "Race / gabarit: " . $pet_breed . "\n";
    }
    if (!empty($current_insurer)) {
        $email_body .= "Assureur actuel: " . $current_insurer . "\n";
    }
    if (!empty($coverage_level_display)) {
        $email_body .= "Niveau de couverture souhaité: " . $coverage_level_display . "\n";
    }
} elseif ($is_resident_form) {
    $household_labels = [
        'seul' => 'Seul',
        'couple' => 'Couple',
        'famille' => 'Famille',
    ];
    $household_status_display = isset($household_labels[$household_status]) ? $household_labels[$household_status] : $household_status;

    if (!empty($age_range)) {
        $email_body .= "Tranche d'âge: " . $age_range . "\n";
    }
    $email_body .= "Mois d'installation: " . format_delivery_timing($installation_timing) . "\n";
    $email_body .= "Statut: " . $household_status_display . "\n";
    if (!empty($origin_insurer)) {
        $email_body .= "Assureur dans le pays d'origine: " . $origin_insurer . "\n";
    }
} else {
    if (!empty($age_range)) {
        $email_body .= "Tranche d'âge: " . $age_range . "\n";
    }
    if (!empty($franchise)) {
        $email_body .= "Franchise: CHF " . $franchise . "\n";
    }
    if (!empty($current_insurer)) {
        $email_body .= "Assureur actuel: " . $current_insurer . "\n";
    }
    if (!empty($accident_coverage)) {
        $email_body .= "Assurance accident incluse: " . $accident_coverage . "\n";
    }
}

$email_body .= "Prénom: " . $first_name . "\n";
if (!empty($last_name)) {
    $email_body .= "Nom: " . $last_name . "\n";
}
$email_body .= "Téléphone: " . $phone_display . "\n";
if (!empty($email)) {
    $email_body .= "Email: " . $email . "\n";
}
$email_body .= "Acceptation d'être recontacté: Oui\n";

if (!empty($lpd_agreement)) {
    $email_body .= "Accord LPD: " . $lpd_agreement . "\n";
}

$email_body .= "\nDate de soumission: " . date('d/m/Y H:i:s') . "\n";
$email_body .= "Source du formulaire: " . $form_source . "\n";

$headers = "From: Assurator.ch <noreply@assurator.ch>\r\n";
$headers .= "Bcc: zd@greenlifeinvest.ch\r\n";

if (!empty($email)) {
    $headers .= "Reply-To: " . $email . "\r\n";
} else {
    $headers .= "Reply-To: noreply@assurator.ch\r\n";
    $headers .= "X-Contact-Phone: " . $phone_display . "\r\n";
}

$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $email_body, $headers)) {
    $response['success'] = true;
    $response['message'] = 'Merci ! Votre demande a été envoyée avec succès.';
} else {
    $response['message'] = "Erreur lors de l'envoi de l'e-mail. Veuillez réessayer plus tard.";
}

echo json_encode($response);
?>
