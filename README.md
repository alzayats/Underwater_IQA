# UNIQAT: Underwater Image Quality Assessment

Project page and documentation for UNIQAT, an open-source toolkit for reproducible
image quality assessment in marine surveys.

**Project page:** https://alzayats.github.io/Underwater_IQA/
**Hosted demo:** https://huggingface.co/spaces/Alzayats/underwater-image-quality

Alzayat Saleh (James Cook University) and Arjun Chennu (Australian Institute of
Marine Science). Manuscript under review at *Methods in Ecology and Evolution*.

---

## What it does

Modern reef surveys return tens of thousands of images per expedition and a
substantial fraction are unusable. Screening them by eye costs weeks of expert time
and produces decisions nobody else can reproduce, because the criteria are
multi-dimensional and rarely written down.

UNIQAT computes 37 reference-free metrics per image, grouped into nine diagnostic
categories. No reference version of the photograph is required, since pristine
ground truth for a survey frame does not exist. The metrics can be combined with
user-defined weights into task-specific scores, so a photogrammetry workflow and a
coral health assessment can apply different thresholds to the same underlying
measurements and each state exactly what they did.

## Metric categories

| Category | Metrics |
| --- | ---: |
| Colour cast analysis | 9 |
| Colour distribution | 7 |
| Contrast measures | 5 |
| Feature richness | 5 |
| Sharpness and blur | 3 |
| Visibility and turbidity | 2 |
| Underwater indices (UCIQE, UIQM) | 2 |
| Information content | 2 |
| Composite assessment scores | 2 |
| **Total** | **37** |

## Evaluation

Measured on 130,845 unfiltered images from nine surveys of the Great Barrier Reef,
spanning three reef sectors, four research trips and three ReefScan camera
configurations.

| Result | Value |
| --- | --- |
| Throughput, traditional pipeline | 7.9 images/sec on a 64 core node with 48 workers |
| Scaling with batch size | r-squared = 0.98 |
| Depth and quality correlation | r = -0.16 to -0.89, negative in every survey |
| Cross-survey metric profile stability | Spearman rho >= 0.97 across all 36 pairwise comparisons |
| Images scoring 60 or above | 57.2 per cent under the default weighting |

The depth relationship is the informative check. Nothing in the metrics knows about
depth, yet quality declines monotonically with it in all nine surveys, which is what
underwater optics predicts.

## Deep learning

Four architectures are provided as training-ready code for users who need faster
single-image inference. They are not shipped pre-trained, and fidelity to the
traditional metrics depends on the imagery they are trained on. Forward-pass cost is
934 to 2,715 images/sec on an RTX 4090 and 4 to 32 images/sec on a single CPU core,
depending on architecture. Held-out fidelity for one trained example is reported in
the manuscript.

## Source code

The source repository is private until publication and will be released alongside
the paper under the MIT licence. The hosted demo will assess an image you upload and
return the full metric breakdown in the meantime.

## Citation

```
Saleh, A. and Chennu, A. UNIQAT: An Open-Source Toolkit for Reproducible Image
Quality Assessment in Marine Surveys. Manuscript under review, Methods in Ecology
and Evolution.
```

## Contents of this repository

This repository holds the project page only. `docs/` is published with GitHub Pages.

```
docs/index.html          project page
docs/methodology.html    method description
docs/documentation.html  usage and API notes
docs/gallery.html        worked examples
docs/css/style.css       styles
docs/js/main.js          image comparison and gallery lightbox
```
