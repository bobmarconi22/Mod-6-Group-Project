from functools import reduce
# Find the average rating for a shop formatted as a string with 2 decimals. Like 2.00
def find_avg(shop):
    num_reviews = len(shop.review)
    if(num_reviews > 0):
        sum_reviews = reduce(lambda acc, review: acc + review.rating, shop.review, 0)
        avg_rating = round(sum_reviews/ num_reviews, 2)

        formatted_rating= "{:.2f}".format(avg_rating)
        return {"avg" : formatted_rating, "num_reviews": num_reviews}
    else:
        return { 'avg': 0, 'num_reviews': 0 }
